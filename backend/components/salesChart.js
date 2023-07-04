import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ orders }) => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const chartHeight = isMobile ? 300 : 400;
  const [groupBy, setGroupBy] = useState("day");

  // Extracting sales data from orders
  const salesData = orders.reduce((data, order) => {
    const date = new Date(order.createdAt);
    const formattedDate =
      groupBy === "month"
        ? date.toLocaleString("default", { month: "short" })
        : date.toLocaleDateString();

    const orderTotal = order.line_items.reduce(
      (total, item) => total + item.price_data.unit_amount / 100,
      0
    );

    if (data[formattedDate]) {
      data[formattedDate] += orderTotal;
    } else {
      data[formattedDate] = orderTotal;
    }

    return data;
  }, {});

  // Formatting sales data for the chart
  const chartData = Object.entries(salesData).map(([date, sales]) => ({
    date,
    sales,
  }));

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  return (
    <div className="bg-teal-900/20 rounded-xl my-5 xl:my-2 ">
      <h2 className="text-2xl font-bold py-5 px-2 sm:text-xl">Sales Chart</h2>
      <div className="flex items-center justify-center mb-4">
        <label className="mr-2">Group By:</label>
        <select
          className="px-2 py-1 border rounded-md bg-teal-900/20 cursor-pointer"
          value={groupBy}
          onChange={handleGroupByChange}
        >
          <option value="month">Month</option>
          <option value="day">Day</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#0d9488" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
