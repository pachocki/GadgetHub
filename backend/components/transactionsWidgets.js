import { useEffect, useState } from "react";
import { BiMoney, BiUser } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";

const transactionsWidgets = ({ orders }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Calculate total revenue and total users whenever the 'orders' state changes
    const sum = orders.reduce((acc, order) => {
      const orderTotal = order.line_items.reduce(
        (itemTotal, item) => itemTotal + item.price_data.unit_amount / 100,
        0
      );
      return acc + orderTotal;
    }, 0);

    setTotalRevenue(sum);
    setTotalUsers(orders.length);
    setTotalOrders(orders.length);
  }, [orders]);
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 ">
      <div className="bg-teal-900/20 rounded-xl h-[22vh] p-5 transition-all hover:bg-teal-900/40 xl:p-3 lg:p-1 lg:h-[15vh] sm:h-[12vh]">
        <div className="flex gap-2 items-center text-3xl xl:text-2xl lg:text-xl md:text-[1rem] sm:text-xl">
          <BiMoney />
          <span >Total Revenue</span>
        </div>
        <div className="flex justify-center items-center text-4xl py-10 font-bold lg:py-5 md:text-2xl">
          {totalRevenue} $
        </div>
      </div>

      <div className="bg-teal-900/20 rounded-xl h-[22vh] p-5 transition-all hover:bg-teal-900/40 xl:p-3  lg:p-1 lg:h-[15vh] sm:h-[12vh]">
        <div className="flex gap-2 items-center text-3xl xl:text-2xl lg:text-xl md:text-[1rem] sm:text-xl">
          <BiUser />
          <span>Total Users</span>
        </div>
        <div className="flex justify-center items-center text-4xl py-10 font-bold lg:py-5 md:text-2xl">
          {totalUsers}
        </div>
      </div>
      <div className="bg-teal-900/20 rounded-xl h-[22vh] p-5 transition-all hover:bg-teal-900/40 xl:p-3 lg:p-1 lg:h-[15vh] sm:h-[12vh]">
        <div className="flex gap-2 items-center text-3xl xl:text-2xl lg:text-xl md:text-[1rem] sm:text-xl">
          <GiReceiveMoney />
          <span>Total Transaction</span>
        </div>
        <div className="flex justify-center items-center text-4xl py-10 font-bold lg:py-5 md:text-2xl">
          {totalOrders}
        </div>
      </div>
    </div>
  );
};

export default transactionsWidgets;
