/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useDeleteServiceMutation } from "../../../redux/features/services/servicesApi";

const ServiceCard = ({ service }) => {
  const [deleteService] = useDeleteServiceMutation();
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Your want to delete this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#42B244",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteService(id).unwrap();
        Swal.fire("Deleted!", "Your service has been deleted.", "success");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };
  return (
    <div className="w-full border border-gray-300 rounded-lg p-5 space-y-3">
      <img
        src={`${imageBaseUrl}${service?.serviceImage}`}
        alt=""
        className="size-28 mx-auto rounded-full"
      />
      <h1 className="text-center text-2xl font-semibold text-[#222222]">
        {service?.serviceName}
      </h1>
      <p className="text-center text-gray-500">{service?.serviceDescription}</p>
      <div className="mt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-5">
          <button
            onClick={() => handleDelete(service?._id)}
            className="px-8 py-2 bg-[#42B244] text-white rounded text-sm w-full sm:w-auto"
          >
            Delete
          </button>

          <Link to={`/service/edit-service/${service?._id}`}>
            <button className="px-8 py-2 border border-[#42B244] text-primary rounded text-sm w-full sm:w-auto">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
