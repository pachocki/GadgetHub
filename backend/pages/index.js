import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

import Orders from "../components/ordersPaid";
import SalesChart from "@/components/salesChart";
import TransactionsWidgets from "@/components/transactionsWidgets";
import PopularProducts from "@/components/popularProducts";
import MoreStatistic from "@/components/moreStatistic";
export default function Home() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <Layout>
      <TransactionsWidgets orders={orders} />
      <SalesChart orders={orders} />
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-[2fr_1fr] sm:pb-32 sm:grid-cols-1">
        <Orders orders={orders} />
        <PopularProducts />
      <MoreStatistic/>
      </div>
    </Layout>
  );
}
