import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddBannerImageMutation } from "../../../redux/features/bannerImage/bannerImageApi";
import { IoChevronBack } from "react-icons/io5";

const AddBannerImage = () => {
  const [form] = Form.useForm();
  const [productImage, setProductImage] = useState(null); // Store a single image file
  const [addBannerImage, { isLoading }] = useAddBannerImageMutation();
  const navigate = useNavigate();

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage({ file, imageUrl }); // Store the file and the preview image
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setProductImage(null); // Clear the selected image
  };

  // Handle Form Submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("description", values?.description);

      // Append the single image to FormData for backend submission
      if (productImage) {
        formData.append("bannerImage", productImage.file); 
      }

      await addBannerImage(formData).unwrap();
      toast.success("Banner Image Added Successfully"); 
      navigate("/bannerImage"); 
    } catch (error) {
     toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/bannerImage">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Add Banner Image</h1>
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
            {productImage && (
              <div key={productImage.imageUrl} className="relative w-24 h-24">
                <img
                  src={productImage.imageUrl}
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
            {!productImage && (
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
          name="title"
          label="Banner Title"
          rules={[{ required: true, message: "Please enter the banner title" }]}
        >
          <CustomInput placeholder="Enter banner title" />
        </Form.Item>

        {/* Description Field */}
        <Form.Item
          name="description"
          label="Banner Description"
          rules={[
            { required: true, message: "Please enter the banner description" },
          ]}
        >
          <CustomInput
            isTextArea
            rows={4}
            placeholder="Enter banner description"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <CustomButton loading={isLoading}>
            {isLoading ? "Adding..." : "Add Banner Image"}
          </CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddBannerImage;
