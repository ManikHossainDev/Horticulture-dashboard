import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddServiceMutation } from "../../../redux/features/services/servicesApi";
import { IoChevronBack } from "react-icons/io5";

const AddService = () => {
  const [form] = Form.useForm();
  const [serviceImage, setServiceImage] = useState(null); // Store a single image file
  const [addService, { isLoading }] = useAddServiceMutation();
  const navigate = useNavigate();

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setServiceImage({ file, imageUrl }); // Store the file and the preview image
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setServiceImage(null); // Clear the selected image
  };

  // Handle Form Submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("serviceName", values?.serviceName);
      formData.append("serviceDescription", values?.serviceDescription);

      // Append the single image to FormData for backend submission
      if (serviceImage) {
        formData.append("serviceImage", serviceImage.file);
      }

      await addService(formData).unwrap();
      toast.success("Service Added Successfully");
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
          <h1 className="text-2xl font-semibold">Add Service</h1>
        </div>
      </div>

      {/* Product Form */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="text-gray-700 font-medium mb-2 block">
            Add Image
          </label>
          <div className="flex gap-4 flex-wrap items-center">
            {serviceImage && (
              <div key={serviceImage?.imageUrl} className="relative w-24 h-24">
                <img
                  src={serviceImage?.imageUrl}
                  alt="Product"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 size-5 flex justify-center items-center bg-rose-500 text-white rounded-full p-1 cursor-pointer"
                >
                  <DeleteOutlined />
                </button>
              </div>
            )}
            {/* Add Image Button */}
            {!serviceImage && (
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

        {/* Title Field */}
        <Form.Item
          name="serviceName"
          label="Service Name"
          rules={[{ required: true, message: "Please enter the service name" }]}
        >
          <CustomInput placeholder="Enter service name" />
        </Form.Item>

        {/* Description Field */}
        <Form.Item
          name="serviceDescription"
          label="Service Description"
          rules={[
            { required: true, message: "Please enter the service description" },
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
            {isLoading ? "Adding..." : "Add Service"}
          </CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddService;
