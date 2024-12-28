import Status from "../../component/Main/Dashboard/Status";
import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";

const DashboardHome = () => {
  return (
    <section>
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className=" py-5 space-y-5">
        <Status />
        <IncomeGraphChart />
        <RecentTransactions />
      </div>
    </section>
  );
};

export default DashboardHome;
