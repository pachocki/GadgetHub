import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";

const Categories = () => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent ? category.parent._id : "");
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function addProperty() {
    setProperties((prev) => [...prev, { name: "", values: "" }]);
  }

  function handlePropertyNameChange(index, newName) {
    setProperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index] = { ...updatedProperties[index], name: newName };
      return updatedProperties;
    });
  }

  function handlePropertyValuesChange(index, newValues) {
    setProperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index] = {
        ...updatedProperties[index],
        values: newValues,
      };
      return updatedProperties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1 className="text-5xl font-bold lg:text-3xl">Categories</h1>
      <div className="flex flex-col gap-5 ">
        <label className="pt-5 sm:text-lg ">
          {editedCategory
            ? `Edit Category ${editedCategory?.name}`
            : "Category name"}
        </label>
        <form onSubmit={saveCategory}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={"Category name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-1/3 px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40 lg:w-1/2 "
            />
            <select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="text-white/60 w-1/4 px-2 py-2  bg-zinc-800  rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40 lg:w-1/2"
            >
              <option value="0">No Parent category</option>
              {categories.length &&
                categories?.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="py-5 mb-5 gap-5">
            <label className="pt-5 sm:text-lg">Properties</label>
            <button
              onClick={addProperty}
              type="button"
              className="block  my-5 px-2 py-1 bg-zinc-700 rounded-xl transition-all hover:opacity-50  font-bold sm:text-sm xs:text-[0.8rem]"
            >
              Add new property
            </button>
            {properties.length > 0 &&
              properties.map((property, index) => (
                <div className="flex gap-1 mb-2" key={index}>
                  <input
                    value={property.name}
                    onChange={(e) =>
                      handlePropertyNameChange(index, e.target.value)
                    }
                    type="text"
                    placeholder="Property name (example color)"
                    className="w-1/4 px-2 py-2 bg-zinc-800 rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40 lg:w-1/2"
                  />
                  <input
                    value={property.values}
                    type="text"
                    placeholder="Values, comma separated"
                    className="w-1/3 px-2 py-2 bg-zinc-800 rounded-xl focus:border-teal-600 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40 lg:w-1/2"
                    onChange={(e) =>
                      handlePropertyValuesChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeProperty(index)}
                    className="px-2 py-1 bg-zinc-700 rounded-xl transition-all hover:opacity-50 font-bold sm:text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <div className=" flex gap-2">
            <button
              type="submit"
              className="px-2 py-1 bg-green-600 rounded-xl transition-all hover:opacity-50 w-24 font-bold  sm:text-sm sm:w-16"
              onClick={saveCategory}
            >
              Save
            </button>
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setName("");
                  setParentCategory("");
                  setProperties([]);
                }}
                className="flex justify-center items-center px-2 py-1 bg-red-600 rounded-xl transition-all hover:opacity-50 w-24 font-bold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {!editedCategory && (
          <table className="mt-5 border border-teal-600/40 w-2/3 xl:w-3/4 lg:w-full">
            <thead className="border border-teal-600/40">
              <tr>
                <th className="text-2xl font-bold px-5 py-2 bg-teal-600/10 lg:text-lg sm:text-sm sm:px-2 xs:text-[0.8rem]">
                  Category Name
                </th>
                <th className="text-2xl font-bold px-5 py-2 bg-teal-600/10 border-l border-teal-600/40 lg:text-lg sm:text-sm sm:px-2 xs:text-[0.8rem] ">
                  Parent Category
                </th>
                <th className="text-2xl font-bold px-5 py-2 bg-teal-600/10 border-l border-teal-600/40 lg:text-lg sm:text-sm sm:px-2 xs:text-[0.8rem] ">
                  Edit / Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length &&
                categories?.map((category) => (
                  <tr key={category._id} className="text-lg sm:text-sm">
                    <td className=" border border-teal-600/40 py-2 px-2 xs:p-1">
                      {category.name}
                    </td>
                    <td className="border  border-teal-600/40 py-2 px-2 xs:p-1">
                       {category?.parent?.name}
                    </td>
                    <td className="flex sm:justify-between">
                      <button
                        onClick={() => editCategory(category)}
                        className="flex items-center cursor-pointer px-5 py-1 my-2 mx-2 bg-green-600 rounded-xl gap-2 transition-all hover:opacity-50 lg:px-2 md:text-sm sm:gap-0 sm:text-[0.7rem] xs:mx-1"
                      >
                        <AiFillEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: `Do you want delete ${category.name}?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                            reverseButtons: true,
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const { _id } = category;
                              await axios.delete("/api/categories?_id=" + _id);
                              Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                              );
                            }
                            fetchCategories();
                          });
                        }}
                        className="flex items-center cursor-pointer px-5 py-1 my-2 mx-2 bg-red-600 rounded-xl gap-2  transition-all hover:opacity-50 lg:px-2 md:text-sm sm:gap-0 xs:text-[0.7rem] xs:mx-1"
                      >
                        <AiFillDelete />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
