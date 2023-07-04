import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./layout";
import { AiOutlineUpload, AiFillDelete } from "react-icons/ai";
import Loader from "./loader";
import { ReactSortable } from "react-sortablejs";
import Link from "next/link";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  shortDescription: existingShortDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [shortDescription, setShortDescription] = useState(existingShortDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();

    // Reset error messages
    setTitleError("");
    setDescriptionError("");
    setPriceError("");
    setCategoryError("");

    // Perform validation checks
    let isFormValid = true;

    if (!title) {
      setTitleError("Please add a product name");
      isFormValid = false;
    }

    if (!description) {
      setDescriptionError("Please add a description");
      isFormValid = false;
    }

    if (!price) {
      setPriceError("Please add a price");
      isFormValid = false;
    }

    if (!category) {
      setCategoryError("Please select a category");
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }
    const data = {
      title,
      shortDescription,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      try {
        const res = await axios.post("/api/upload", data);
        setImages((oldImages) => [...oldImages, ...res.data.links]);
        setIsUploading(false);
      } catch (error) {
        console.log("Error uploading images:", error);
        setIsUploading(false); // Set loading state to false in case of an error
      }
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }
  const isEditing = !!existingTitle;
  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category._id);
    if (catInfo) {
      propertiesToFill.push(...catInfo.properties);
      while (catInfo?.parent?._id) {
        const parentCat = categories.find(
          ({ _id }) => _id === catInfo?.parent?._id
        );
        if (parentCat) {
          propertiesToFill.push(...parentCat.properties);
          catInfo = parentCat;
        } else {
          break; // Exit the loop if parentCat is undefined
        }
      }
    }
  }
  function removeImage(index) {
    setImages((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }
  return (
    <Layout>
      <div>
        <h1 className="text-2xl py-5 px-10">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h1>
      </div>
      <div>
        <form
          className="flex flex-col gap-5 w-1/2 pl-10"
          onSubmit={saveProduct}
        >
          <label>Product name</label>
          {titleError && <p className="text-red-500">{titleError}</p>}
          <input
            placeholder="Product Name"
            className="px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
          />
          <label>Category</label>
          {categoryError && <p className="text-red-500">{categoryError}</p>}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCategoryError("");
            }}
            className="px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            {category.name ? (
              <option value="">{category.name}</option>
            ) : (
              <option value="">Uncategorized</option>
            )}
            {categories?.length > 0 &&
              categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          {propertiesToFill.length > 0 &&
            propertiesToFill.map((p) => (
              <div className="flex flex-col gap-5" key={p.name}>
                <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                <div className="w-full">
                  <select
                    className="w-full px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={productProperties[p.name]}
                    onChange={(ev) => setProductProp(p.name, ev.target.value)}
                  >
                    {p.values.map((v) => (
                      <option key={v} value={v}>
                        {v[0].toUpperCase() + v.substring(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          <label>Product photo</label>
          <div className="flex gap-5">
            <ReactSortable
              list={images}
              setList={updateImagesOrder}
              className="flex gap-5"
            >
              {!!images?.length &&
                images.map((link) => (
                  <div
                    className=" relative w-44 h-44 p-2 rounded-xl border border-teal-600/50"
                    key={link}
                  >
                    <img src={link} alt="product" className="w-full h-full" />
                    <div
                      className="bg-red-600 p-2 absolute right-2 bottom-2 rounded cursor-pointer"
                      onClick={removeImage}
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                ))}
            </ReactSortable>
          </div>
          <div>
            {isUploading ? (
              <Loader />
            ) : (
              <button
                className="relative w-24 h-24 rounded-xl border border-teal-600/50 bg-white/20 mb-5 flex gap-1 justify-center items-center transition-all hover:bg-teal-600/20"
                onClick={uploadImages}
              >
                <AiOutlineUpload /> Upload
                <input
                  type="file"
                  className="absolute z-[50] opacity-0  w-24 h-24 cursor-pointer "
                  onChange={uploadImages}
                />
              </button>
            )}
            {!images?.length && <div>No photos in this product</div>}
          </div>
          <label>Short Description</label>
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}
          <textarea
            placeholder="Description"
            className="h-44 px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40  "
            value={shortDescription}
            onChange={(e) => {
              
              setShortDescription(e.target.value);
            }}
          ></textarea>
          <label>Description</label>
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}
          <textarea
            placeholder="Description"
            className="h-44 px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40  "
            value={description}
            onChange={(e) => {
              setDescriptionError("");
              setDescription(e.target.value);
            }}
          ></textarea>
          <label>Price in Usd</label>
          {priceError && <p className="text-red-500">{priceError}</p>}
          <input
            placeholder="Price"
            className="px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
            type="number"
            value={price}
            onChange={(e) => {
              setPriceError("");
              setPrice(e.target.value);
            }}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-2 bg-green-600 rounded-xl transition-all hover:opacity-50 w-1/4 font-bold"
            >
              Save
            </button>
            <Link
              href={"/products"}
              className="px-2 py-1 flex justify-center items-center bg-red-600 rounded-xl transition-all hover:opacity-50 w-24 font-bold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default ProductForm;
