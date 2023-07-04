const OrdersPaid = ({ orders }) => {
  return (
    <div className="bg-teal-900/20 rounded-xl  hover:bg-teal-900/40 p-4 xl:p-2 h-full">
      <h2 className="text-2xl font-bold sm:text-xl">Orders</h2>
      <p className="text-white/40 lg:text-sm ">Paid orders</p>
      <table className="mt-4 mb-24 border border-teal-600/40 w-2/3 xl:w-[90%]  lg:w-full md:mt-8">
        <thead className="border border-teal-600/40">
          <tr>
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
            orders
              .filter((order) => order?.paid === true)
              .slice(0,4)
              .map((order) => {
                return (
                  <tr key={order?._id}>
                    <td className="border border-teal-600/40 py-2 px-2 text-xl font-semibold lg:text-sm sm:text-[0.8rem] ">
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

                    <td className="text-center border border-teal-600/40 py-2 px-2 text-xl font-semibold lg:text-sm sm:text-[0.8rem] ">
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
    </div>
  );
};

export default OrdersPaid;
