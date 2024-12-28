/* eslint-disable no-unused-vars */
import { Form } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { toast } from "sonner";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/category/categoryApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const EditCategory = () => {
  const { id } = useParams();
  const { data: category, isLoading: isFetching } = useGetCategoryByIdQuery(
    id,
    {
      skip: !id,
    }
  );
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [form] = Form.useForm(); // Ant Design form instance

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.categoryName,
      });
      setPreview(`${imageBaseUrl}${category?.categoryImage}`); 
    }
  }, [category, form]);

  const handleUploadScore = async (values) => {
    const { name } = values;

    if (!selectedFile && !preview) {
      setImageError(true);
      return;
    }

    const formData = new FormData();
    if (name) {
      formData.append("categoryName", name);
    }
    if (selectedFile) {
      formData.append("categoryImage", selectedFile);
    }

    try {
      const res = await updateCategory({ id, data: formData }); // Pass ID and data
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success("Category updated successfully");
        navigate(`/category`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setImageError(false);
    }
  };

  const handleDivClick = () => {
    document.getElementById("imageUpload").click();
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-4 items-center">
          <Link to="/category">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Category</h1>
        </div>
      </div>
      <div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          onFinish={handleUploadScore}
          autoComplete="off"
        >
          <div
            className={`relative w-60 h-40 rounded-xl border mb-2 flex justify-center items-center bg-[#e8ebf0] cursor-pointer ${
              imageError ? "border-red-500" : ""
            }`}
            onClick={handleDivClick}
          >
            {preview ? (
              <img
                src={preview}
                alt="Selected"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="bg-[#c6dadc] p-2 text-white">
                <FaCamera size={30} />
              </div>
            )}

            {preview && (
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <FaCamera size={30} className="text-white mb-2" />
                <p className="text-white text-sm">Click to change image</p>
              </div>
            )}
          </div>

          {imageError && (
            <span className="text-red-500 text-sm">
              Please upload a category image.
            </span>
          )}

          <input
            id="imageUpload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className="flex gap-5">
            <Form.Item
              name="name"
              label="Category Name"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input category name",
                },
              ]}
            >
              <CustomInput placeholder="Category Name" />
            </Form.Item>
          </div>
          <Form.Item>
            <CustomButton loading={isLoading}>Update Category</CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditCategory;
