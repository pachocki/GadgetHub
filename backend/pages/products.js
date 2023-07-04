import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <div>
      <h1 className="text-5xl font-bold pb-10 lg:text-3xl">Products</h1>
      </div>
      <Link
        href={"/products/new"}
        className="px-3 py-3 bg-green-600 rounded-xl transition-all hover:opacity-50 lg:p-2 sm:text-sm xs:text-[0.8rem]"
      >
        Add new product
      </Link>
      <table className="mt-12 mb-24 border border-teal-600/40 w-4/5 xl:w-full md:mt-8">
        <thead className="border border-teal-600/40">
          <tr>
           
            <td className="text-2xl font-bold px-5 py-2 bg-teal-600/10 xl:text-lg lg:px-2 sm:text-sm">
              {products.length > 0
                ? "Product Name"
                : "Please add a new product"}
            </td>
            {!products.length && <td></td>}
            <td className="text-2xl font-bold px-5 py-2 bg-teal-600/10 border-l border-teal-600/40 xl:text-lg lg:px-2 lg:py-1 sm:text-sm">
              Product Category
            </td>
            <td className="text-2xl font-bold px-5 py-2 bg-teal-600/10 border-l border-teal-600/40 xl:text-lg lg:px-2 sm:text-sm">
              Edit / Delete
            </td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="text-xl border-r px-5 py-2 border-teal-600/40 w-2/3 lg:px-2 lg:text-lg sm:text-sm xs:text-[0.7rem]">
                {product.title}
              </td>
              <td className="text-xl border-r px-5 py-2 border-teal-600/40 w-2/3 lg:px-2 lg:text-lg sm:text-sm xs:text-[0.7rem]">
                {product?.category?.name}
              </td>
              <td className="flex">
                <Link
                  className="flex items-center cursor-pointer px-5 py-1 my-2 mx-2 bg-green-600 rounded-xl gap-2 transition-all hover:opacity-50 lg:text-sm lg:px-2 xs:gap-0 xs:m-1 xs:text-[0.7rem]"
                  href={"/products/edit/" + product._id}
                >
                  <AiFillEdit />
                  Edit
                </Link>
                <Link
                  className="flex items-center cursor-pointer px-5 py-1 my-2 mx-2 bg-red-600 rounded-xl gap-2  transition-all hover:opacity-50 lg:text-sm lg:px-2  xs:gap-0 xs:m-1 xs:text-[0.7rem]"
                  href={"/products/delete/" + product._id}
                >
                  <AiFillDelete  />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
