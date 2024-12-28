import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetSubscriptionsQuery } from "../../../redux/features/subscriptions/subscriptionsApi";
import SubscriptionCard from "./SubscriptionCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Spin } from "antd";

const Subscription = () => {
  const { data: responseData, isLoading, isError } = useGetSubscriptionsQuery();
  const allSubscriptions = responseData?.results;
  let content = null;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="w-full flex justify-center py-10">
        Something went wrong
      </div>
    );
  } else if (!allSubscriptions?.length) {
    content = <NoDataFound message={"No Subscriptions Found"} />;
  } else {
    content = (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3  gap-5 pb-10">
        {allSubscriptions?.map((subscription, i) => (
          <SubscriptionCard key={i} subscription={subscription} />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-between items-center py-[19px] border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold ">All Subscription</h1>
        <Link to={`/subscription/add-subscription`}>
          <button className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Subscription
          </button>
        </Link>
      </div>
      {content}
    </>
  );
};

export default Subscription;
