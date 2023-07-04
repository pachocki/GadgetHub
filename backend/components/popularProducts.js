import axios from "axios";
import { useEffect, useState } from "react";

const popularProducts = () => {
  const [topOrders, setTopOrders] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  useEffect(() => {
    // Fetch order data from your backend API
    axios
      .get("/api/orders")
      .then((response) => {
        const data = response.data;
        // Perform calculations to determine the top orders
        const orderCountMap = new Map();
        data.forEach((order) => {
          const deviceId = order.line_items[0].price_data.product_data.name;
          const key = `${deviceId}`;
          const count = orderCountMap.get(key) || 0;
          orderCountMap.set(key, count + 1);
        });

        const sortedOrders = Array.from(orderCountMap.entries()).sort(
          (a, b) => b[1] - a[1]
        );

        const top3Orders = sortedOrders.slice(0, 3).map(([key]) => {
          const [deviceId] = key.split("-");
          const product = products.find(
            (product) => product.title === deviceId
          );
          const image = product?.images[0] || ""; // Get the first image of the product
          return {
            deviceId,
            count: orderCountMap.get(key),
            image,
          };
        });

        setTopOrders(top3Orders);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, [products]);
  return (
    <div className="bg-teal-900/20 rounded-xl p-4 hover:bg-teal-900/40 h-full xl:p-2 sm:pb-5">
      <h2 className="text-2xl font-bold sm:text-xl">Top 3</h2>
      <p className="text-white/40 lg:text-sm ">The most popular products</p>
      <div className="flex flex-col gap-5 pt-4">
        {topOrders.map((order, index) => (
          <div key={index}>
            <div className="flex items-center gap-4 text-2xl xl:text-xl font-bold xl:gap-2 lg:text-lg md:text-sm">
              <img
                src={order.image}
                alt={order.deviceId}
                className="bg-white rounded-xl h-[10vh] lg:h-[8vh]"
              />
              <span>{order.deviceId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default popularProducts;
