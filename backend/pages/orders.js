import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
 
  return (
    <Layout>
      <h1 className="text-5xl font-bold lg:text-3xl md:text-2xl ">Orders</h1>

      <table className="mt-12 mb-24 border border-teal-600/40 w-2/3 xl:w-[90%] lg:w-full md:mt-8">
        <thead className="border border-teal-600/40">
          <tr>
            <th className="text-2xl font-bold px-5 py-2  border-r border-teal-600/40 bg-teal-600/10 lg:text-lg sm:text-sm sm:px-1">
              Date
            </th>
            <th className="text-2xl font-bold px-5 py-2 border-r border-teal-600/40 bg-teal-600/10 lg:text-lg sm:text-sm sm:px-1">
              Paid
            </th>
            <th className="text-2xl font-bold px-5 py-2 border-r border-teal-600/40 bg-teal-600/10 lg:text-lg sm:text-sm sm:px-1">
              Recipient
            </th>

            <th className="text-2xl font-bold px-5 py-2 bg-teal-600/10 lg:text-lg sm:text-sm sm:px-1">
              Products
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order) => {
              return (
                <tr key={order?._id}>
                  <td className="text-center border border-teal-600/40 py-2 px-2 text-xl font-semibold md:text-sm sm:text-[0.8rem]    xs:text-[0.6rem]">
                    {new Date(order?.createdAt).toLocaleString()}
                  </td>
                  <td
                    className={`border border-teal-600/40 py-2 px-2 text-xl  font-semibold text-center md:text-sm sm:text-[0.8rem]   xs:text-[0.6rem] ${
                      order?.paid === true ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order?.paid ? "Yes" : "No"}
                  </td>
                  <td className="border border-teal-600/40 py-2 px-2 text-xl font-semibold md:text-sm sm:text-[0.8rem]  xs:text-[0.6rem]">
                    Name: {order?.name}
                    <br />
                    Street: {order?.street}
                    <br />
                    City: {order?.city}
                    <br />
                    Country: {order?.country}
                    <br />
                    Email: {order?.email}
                  </td>

                  <td className="text-center border border-teal-600/40 py-2 px-2 text-xl font-semibold md:text-sm sm:text-[0.8rem] xs:text-[0.6rem]">
                    {order?.line_items.map((item, index) => (
                      <p key={index} className="mt-5px">
                        {item.price_data.product_data.name} <br />
                        Quantity: {item.quantity}
                      </p>
                    ))}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
