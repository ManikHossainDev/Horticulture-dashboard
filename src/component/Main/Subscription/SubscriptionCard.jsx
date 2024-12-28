/* eslint-disable react/prop-types */
import { IoCheckmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useDeleteSubscriptionMutation } from "../../../redux/features/subscriptions/subscriptionsApi";

const SubscriptionCard = ({ subscription }) => {
  const { _id, name, duration, price, maxListings, benefits } =
    subscription;
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const showDeleteConfirm = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Subscription? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteSubscription(id);
      if (res.error) {
        toast.error("Failed to delete subscription");
        return;
      }
      toast.success("Subscription deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="w-full bg-primary text-white border rounded-lg ">
      <h2 className="text-4xl font-bold py-7 text-center">{name}</h2>
      <div className="border-b border-white"></div>
      {/* Pricing Section */}
      <div className="flex gap-2 py-3 justify-center items-center">
        <p className="text-3xl md:text-5xl font-bold">${price}</p>
        <div className="text-xl">
          <p className="font-bold">Per {duration} Month</p>

        </div>
      </div>

      {/* Max Listings */}
      <div className="text-center py-3">
        <p className="text-lg font-semibold">Max Listings: {maxListings}</p>
      </div>

      <div className="p-8">
        <ul className="text-left space-y-4 text-white">
          {/* Benefits List */}
          {benefits?.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <span className="size-8 flex-none rounded-full flex justify-center items-center bg-white text-primary">
                <IoCheckmarkOutline size={20} />
              </span>
              <span className="ml-2">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5 px-5 pb-5">
        <button
          onClick={() => showDeleteConfirm(_id)}
          className="px-8 py-2 bg-white text-primary rounded text-sm w-full sm:w-auto"
        >
          Delete
        </button>

        <Link to={`/subscription/edit-subscription/${_id}`}>
          <button className="px-8 py-2 border border-white text-white rounded text-sm w-full sm:w-auto">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionCard;
