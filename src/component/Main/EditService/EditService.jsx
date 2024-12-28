import { PlusOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useState, useEffect } from "react";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "../../../redux/features/services/servicesApi";
import { FaCamera } from "react-icons/fa6";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { IoChevronBack } from "react-icons/io5";

const EditService = () => {
  const [form] = Form.useForm();
  const [serviceImage, setServiceImage] = useState(null); // Store the selected image
  const [serviceFile, setServiceFile] = useState(null); // Store the file of the image
  const [updateService, { isLoading }] = useUpdateServiceMutation();
  const { id } = useParams(); // Get the ID from the URL params
  const navigate = useNavigate();

  // Fetch existing service data using the ID
  const { data: serviceData } = useGetSingleServiceQuery(id, {
    skip: !id,
  });

  // Set the form fields and image when the service data is fetched
  useEffect(() => {
    if (serviceData) {
      form.setFieldsValue({
        serviceName: serviceData.serviceName,
        serviceDescription: serviceData.serviceDescription,
      });
      setServiceImage(`${imageBaseUrl}${serviceData.serviceImage}`); // Set the current image URL
    }
  }, [serviceData, form]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setServiceFile(file);
      setServiceImage(imageUrl); // Set the new image preview
    }
  };

  // Handle Form Submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("serviceName", values?.serviceName);
      formData.append("serviceDescription", values?.serviceDescription);

      // Append the new image to the FormData for submission if a new image is selected
      if (serviceFile) {
        formData.append("serviceImage", serviceFile);
      }

      await updateService({ id, data: formData }).unwrap();

      toast.success("Service Updated Successfully");
      navigate("/service");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/faq">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Service</h1>
        </div>
      </div>
      {/* Product Form */}
      {serviceData && (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-6">
            <label className="text-gray-700 font-medium mb-2 block">
              Edit Image
            </label>
            <div className="flex gap-4 flex-wrap items-center">
              {serviceImage ? (
                <div
                  className="relative w-24 h-24 cursor-pointer"
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <img
                    src={serviceImage}
                    alt="Service"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <FaCamera size={24} className="text-white mb-2" />
                    <p className="text-white text-sm">Change image</p>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="w-24 h-24 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition"
                >
                  <PlusOutlined className="text-gray-500 text-xl" />
                </label>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Service Name Field */}
          <Form.Item
            name="serviceName"
            label="Service Name"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <CustomInput placeholder="Enter service name" />
          </Form.Item>

          {/* Service Description Field */}
          <Form.Item
            name="serviceDescription"
            label="Service Description"
            rules={[
              {
                required: true,
                message: "Please enter the service description",
              },
            ]}
          >
            <CustomInput
              isTextArea
              rows={4}
              placeholder="Enter service description"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <CustomButton loading={isLoading}>
              {isLoading ? "Updating..." : "Update Service"}
            </CustomButton>
          </Form.Item>
        </Form>
      )}
    </section>
  );
};

export default EditService;
