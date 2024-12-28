import { Spin, Pagination } from "antd";
import { useState } from "react";
import {
  useGetBannerImageQuery,
  useDeleteBannerImageMutation,
} from "../../../redux/features/bannerImage/bannerImageApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "sonner";
import NoDataFound from "../NoDataFound/NoDataFound";

const BannerImage = () => {
  // State to store current page
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [deleteBannerImage] = useDeleteBannerImageMutation();
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetBannerImageQuery({ page: currentPage, pageSize });
  const bannerImage = responseData?.results;
  const totalResult = responseData?.totalResult;

  // Change page handler
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle delete button click (show confirmation dialog)
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Your want to delete this banner image!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#42B244",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBannerImage(id).unwrap();
        Swal.fire("Deleted!", "Your banner image has been deleted.", "success");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

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
  } else if (!bannerImage?.length) {
    content = <NoDataFound message={"No Banner Image Found"} />;
  } else if (bannerImage?.length) {
    content = (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
        {bannerImage.map((banner) => (
          <div
            key={banner?._id}
            className="w-full rounded-lg overflow-hidden border"
          >
            <img
              src={`${imageBaseUrl}${banner?.bannerImage}`}
              alt={banner?.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-5 space-y-2">
              <h1 className="text-2xl font-semibold">{banner?.title}</h1>
              <p className="text-gray-600">{banner?.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-5">
                <button
                  onClick={() => handleDelete(banner?._id)}
                  className="px-8 py-2 bg-[#42B244] text-white rounded text-sm w-full sm:w-auto"
                >
                  Delete
                </button>

                <Link to={`/bannerImage/edit-banner-image/${banner?._id}`}>
                  <button className="px-10 py-2 border border-[#42B244] text-[#42B244] rounded text-sm w-full sm:w-auto">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center py-5 border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold">Banner Image</h1>
        <Link to={`/bannerImage/add-banner-image`}>
          <button className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Banner Image
          </button>
        </Link>
      </div>
      {content}

      {/* Show pagination only if totalResult is greater than 10 */}
      {totalResult > 10 && (
        <div className="w-full flex justify-center mt-10">
          <Pagination
            current={currentPage}
            total={totalResult}
            pageSize={pageSize}
            onChange={onPageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </section>
  );
};

export default BannerImage;
