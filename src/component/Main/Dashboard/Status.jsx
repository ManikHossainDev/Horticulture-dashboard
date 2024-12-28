import { FaBorderAll, FaDatabase } from "react-icons/fa";
import { PiCurrencyCircleDollar, PiUsers, PiUsersThree } from "react-icons/pi";
import { useGetDashboardDataQuery } from "../../../redux/features/dashboard/dashboardApi";

const Status = () => {
  const { data:responseData } = useGetDashboardDataQuery();
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      <div className="flex justify-between items-center p-5 rounded-lg bg-[#F3F8FC]">
        <div className="size-10 md:size-14 xl:size-[70px] 2xl:size-20 p-3 flex justify-center items-center rounded-full bg-primary text-white">
          <PiCurrencyCircleDollar className="size-5 md:size-6 xl:size-7 2xl:size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-4xl font-semibold text-[#222222]">
            ${responseData?.totalEarnings}
          </h1>
          <h1>Total Earning</h1>
        </div>
      </div>
      <div className="flex justify-between items-center p-5 rounded-lg bg-[#F3F8FC]">
        <div className="size-10 md:size-14 xl:size-[70px] 2xl:size-20 p-3 flex justify-center items-center rounded-full bg-primary text-white">
          <PiUsersThree className="size-5 md:size-6 xl:size-7 2xl:size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-4xl font-semibold text-[#222222]">
            {responseData?.totalUsers}
          </h1>
          <h1>Total User</h1>
        </div>
      </div>
      <div className="flex justify-between items-center p-5 rounded-lg bg-[#F3F8FC]">
        <div className="size-10 md:size-14 xl:size-[70px] 2xl:size-20 p-3 flex justify-center items-center rounded-full bg-primary text-white">
          <PiUsers className="size-5 md:size-6 xl:size-7 2xl:size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-4xl font-semibold text-[#222222]">
            {responseData?.totalBusinessman}
          </h1>
          <h1>Total Businessman</h1>
        </div>
      </div>
      <div className="flex justify-between items-center p-5 rounded-lg bg-[#F3F8FC]">
        <div className="size-10 md:size-14 xl:size-[70px] 2xl:size-20 p-3 flex justify-center items-center rounded-full bg-primary text-white">
          <FaDatabase className="size-5 md:size-6 xl:size-7 2xl:size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-4xl font-semibold text-[#222222]">
            {responseData?.totalProducts}
          </h1>
          <h1>Total Products</h1>
        </div>
      </div>
      <div className="flex justify-between items-center p-5 rounded-lg bg-[#F3F8FC]">
        <div className="size-10 md:size-14 xl:size-[70px] 2xl:size-20 p-3 flex justify-center items-center rounded-full bg-primary text-white">
          <FaBorderAll className="size-5 md:size-6 xl:size-7 2xl:size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-4xl font-semibold text-[#222222]">
          {responseData?.totalCompletedOrders}
          </h1>
          <h1>Completed Order</h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
