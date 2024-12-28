import { PlusOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useState, useEffect } from "react";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetSingleBannerImageQuery,
  useUpdateBannerImageMutation,
} from "../../../redux/features/bannerImage/bannerImageApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { FaCamera } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";

const EditBannerImage = () => {
  const [form] = Form.useForm();
  const [productImage, setProductImage] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [updateBannerImage, { isLoading }] = useUpdateBannerImageMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing banner data using the id
  const { data: bannerData } = useGetSingleBannerImageQuery(id, {
    skip: !id,
  });

  // When the banner data is fetched, set the form fields and image
  useEffect(() => {
    if (bannerData) {
      form.setFieldsValue({
        title: bannerData.title,
        description: bannerData.description,
      });
      setProductImage(`${imageBaseUrl}${bannerData.bannerImage}`);
    }
  }, [bannerData, form]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductFile(file);
      setProductImage(imageUrl);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("description", values?.description);

      // Append the image to FormData for backend submission
      if (productFile) {
        formData.append("bannerImage", productFile);
      }

      await updateBannerImage({ id, data: formData }).unwrap();

      toast.success("Banner Image Updated Successfully");
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
          <h1 className="text-2xl font-semibold">Edit Banner Image</h1>
        </div>
      </div>

      {/* Product Form */}
      {bannerData && (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-6">
            <label className="text-gray-700 font-medium mb-2 block">
              Edit Image
            </label>
            <div className="flex gap-4 flex-wrap items-center">
              {productImage ? (
                <div
                  className="relative w-24 h-24 cursor-pointer"
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <img
                    src={productImage}
                    alt="Product"
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

          {/* Title Field */}
          <Form.Item
            name="title"
            label="Banner Title"
            rules={[
              { required: true, message: "Please enter the banner title" },
            ]}
          >
            <CustomInput placeholder="Enter banner title" />
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            name="description"
            label="Banner Description"
            rules={[
              {
                required: true,
                message: "Please enter the banner description",
              },
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
              {isLoading ? "Updating..." : "Update Banner Image"}
            </CustomButton>
          </Form.Item>
        </Form>
      )}
    </section>
  );
};

export default EditBannerImage;
