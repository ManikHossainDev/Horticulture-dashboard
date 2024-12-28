import { Link } from "react-router-dom";
import { Spin } from "antd";
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} from "../../../redux/features/faq/faqApi";
import NoDataFound from "../NoDataFound/NoDataFound";

const Faq = () => {
  const { data: responseData, isLoading, isError } = useGetAllFaqQuery();
  const [deleteFaq] = useDeleteFaqMutation();

  // Handle delete with confirmation via SweetAlert2
  const handleDelete = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this FAQ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#42B244", // Custom color for the confirm button
        cancelButtonColor: "#d33", // Custom color for the cancel button
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteFaq(id).unwrap();
        toast.success("FAQ Deleted Successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  let content = null;
  const faqData = responseData?.results;

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
  } else if (!faqData?.length) {
    content = <NoDataFound message={"No Faq Found"} />;
  } else {
    content = (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
        {faqData?.map((faq) => (
          <div
            key={faq._id}
            className="w-full rounded-lg overflow-hidden border"
          >
            <div className="p-5 space-y-2">
              <h1 className="text-2xl font-semibold">{faq.question}</h1>
              <p className="text-gray-600">{faq.answer}</p>
              <div>
                <div className="flex justify-between items-center mt-5">
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="px-8 py-2 bg-[#42B244] text-white rounded text-sm w-full sm:w-auto"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/faq/edit-faq/${faq._id}`}
                    className="px-8 py-2 border border-[#42B244] text-primary rounded text-sm w-full sm:w-auto"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center py-[19px] border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold ">All FAQs</h1>
        <Link to={`/faq/add-faq`}>
          <button className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add FAQ
          </button>
        </Link>
      </div>
      {content}
    </section>
  );
};

export default Faq;
