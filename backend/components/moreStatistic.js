const MoreStatistic = () => {
    return (
        <div className="bg-gradient-to-r from-teal-900 to-blue-500/20 flex flex-col justify-center gap-10 rounded-xl px-5 lg:hidden">
        <span className="text-4xl font-bold xl:text-2xl">
          See more detail statistic <br /> to analyze <br />
          Your decision
        </span>
        <span className="flex items-center  justify-center bg-white rounded-xl p-2 w-32 text-black font-bold cursor-pointer">
          View more
        </span>
      </div>
    );
}

export default MoreStatistic;