/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteCategoryMutation } from "../../../redux/features/category/categoryApi";
import Swal from "sweetalert2"; // Import Swal
import { toast } from "sonner";

const CategoryCard = ({ category }) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    // Confirmation with Swal
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Your wanted category will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#42B244",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(category?._id).unwrap();
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="w-full rounded-md border">
      <img
        src={`${imageBaseUrl}${category?.categoryImage}`}
        alt="Category"
        className="w-full h-56 rounded-t-md"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold">{category?.categoryName}</h2>

        <div className="flex justify-between items-center gap-2 mt-5">
          <button
            onClick={handleDelete}
            className="px-8 py-2 bg-[#42B244] text-white rounded text-sm w-full sm:w-auto"
          >
            Delete
          </button>
          <Link to={`/category/edit-category/${category?._id}`}>
            <button className="px-8 py-2 border border-[#42B244] text-primary rounded text-sm w-full sm:w-auto">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
