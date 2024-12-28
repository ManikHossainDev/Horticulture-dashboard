/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteProductMutation } from "../../../redux/features/product/productApi";

const ProductCard = ({ item }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const { _id, productName, productDescription, productImages, category } =
    item;

  const showDeleteConfirm = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Item? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(productId);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const res = await deleteProduct(productId);
      if (res.error) {
        toast.error("Failed to delete product");
        return;
      }
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full rounded-lg border shadow-sm max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      {/* Image Handling with Fallback */}
      <img
        src={`${imageBaseUrl}${productImages[0]}`}
        alt={productName || "Product Image"}
        className="w-full h-64 rounded-t-lg object-cover"
      />

      <div className="p-5 space-y-3">
        {/* Product Name */}
        <h1 className="font-semibold text-xl text-center sm:text-left">
          {productName || "Unnamed Item"}
        </h1>

        {/* Product Description */}
        <p className="text-gray-600">
          {typeof productDescription === "string" &&
          productDescription.length > 124 ? (
            <>
              {productDescription.substring(0, 124)}{" "}
              <span
                className="text-primary"
              >
                ...
              </span>
            </>
          ) : (
            productDescription
          )}
        </p>

        {/* Category */}
        <p>
          <span className="font-medium">Category:</span>{" "}
          {category || "Uncategorized"}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5 px-5 pb-5">
        <button
          onClick={() => showDeleteConfirm(_id)}
          className="px-8 py-2 bg-[#42B244] text-white rounded text-sm w-full sm:w-auto"
        >
          Delete
        </button>

        <Link to={`/product/edit-product/${_id}`}>
          <button className="px-8 py-2 border border-[#42B244] text-primary rounded text-sm w-full sm:w-auto">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
