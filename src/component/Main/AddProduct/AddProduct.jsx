import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select, Table } from "antd";
import { useState } from "react";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { useAddProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [sizes, setSizes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSize, setNewSize] = useState({ size: "", price: "", colors: [] });
  const [newColor, setNewColor] = useState("#000000");
  const [productImages, setProductImages] = useState([]);
  const [productFile, setProductFiles] = useState([]);
  const { data: responseData} = useGetAllCategoriesQuery({
    page: 1,
    limit : 5000,
  });
  const allCategories = responseData?.results;
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  // Handle Add Size Modal
  const handleAddSize = () => {
    if (!newSize.size || !newSize.price) {
      return; // Ensure required fields are filled
    }
    setSizes([...sizes, newSize]);
    setNewSize({ size: "", price: "", colors: [] });
    setIsModalOpen(false);
  };

  // Handle Add Color
  const handleAddColor = () => {
    if (!newColor) return;
    setNewSize({ ...newSize, colors: [...newSize.colors, newColor] });
    setNewColor("#000000"); // Reset color picker
  };

  // Handle Remove Color
  const handleRemoveColor = (index) => {
    const updatedColors = newSize.colors.filter((_, i) => i !== index);
    setNewSize({ ...newSize, colors: updatedColors });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProductFiles([...productFile, ...files]);
    setProductImages([...productImages, ...imageUrls]);
  };

  // Remove Image
  const handleRemoveImage = (index) => {
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
  };

  // Remove Size Row
  const handleRemoveSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  // Handle Submit Form
  const handleSubmit = async (values) => {
    if (productFile?.length < 2) {
      toast.error("Please upload at least two image");
      return;
    } else if (sizes?.length <= 0) {
      toast.error("Please add at least one size");
      return;
    }
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("productDescription", values.productDescription);
    formData.append("category", values.category);
    // Append product images
    productFile.forEach((image) => {
      formData.append("productImages", image);
    });

    // Append sizes
    formData.append("sizes", JSON.stringify(sizes));

    try {
      const result = await addProduct(formData).unwrap();
      toast.success(result.data.message);
      form.resetFields();
      navigate("/product");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  // Columns for the Sizes Table
  const columns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (colors) =>
        colors.map((color, index) => (
          <span
            key={index}
            className="inline-block w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: color }}
            title={color}
          ></span>
        )),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Button type="link" danger onClick={() => handleRemoveSize(index)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/product">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Add Product</h1>
        </div>
      </div>

      {/* Product Form */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Product Images */}
        <div className="mb-6">
          <label className="text-gray-700 font-medium mb-2 block">
            Product Images
          </label>
          <div className="flex gap-4 flex-wrap items-center">
            {productImages.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img}
                  alt={`Product-${index}`}
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 size-5 flex justify-center items-center bg-rose-500 text-white rounded-full p-1 cursor-pointer"
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
            {/* Add Image Button */}
            <label
              htmlFor="image-upload"
              className="w-24 h-24 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition"
            >
              <PlusOutlined className="text-gray-500 text-xl" />
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Product Name */}
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <CustomInput placeholder="Enter product name" />
        </Form.Item>

        {/* Product Description */}
        <Form.Item
          name="productDescription"
          label="Product Description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <CustomInput
            isTextArea
            rows={4}
            placeholder="Enter product description"
          />
        </Form.Item>

        {/* Category */}
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select size="large" placeholder="Select a category">
            {allCategories?.map((category) => (
              <Option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Sizes, Prices, and Colors */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-700 font-medium">
              Sizes, Prices & Colors
            </label>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Add Size
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={sizes.map((size, index) => ({ ...size, key: index }))}
            pagination={false}
            bordered
          />
        </div>

        {/* Submit Button */}
        <Form.Item>
          <CustomButton loading={isLoading}>Submit Product</CustomButton>
        </Form.Item>
      </Form>

      {/* Add Size Modal */}
      <Modal
        title="Add Size"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        onOk={handleAddSize}
      >
        <Form layout="vertical">
          {/* Select Size */}
          <Form.Item
            label="Size"
            rules={[{ required: true, message: "Please select a size" }]}
            required
          >
            <CustomInput
              type="text"
              value={newSize.size}
              onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
              placeholder="Enter size"
            />
          </Form.Item>
          {/* Input Price */}
          <Form.Item
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
            required
          >
            <CustomInput
              value={newSize.price}
              onChange={(e) =>
                setNewSize({ ...newSize, price: e.target.value })
              }
              placeholder="Enter price"
            />
          </Form.Item>
          {/* Color Picker */}
          <Form.Item label="Colors">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-10 h-10 border rounded-md"
              />
              <Button type="primary" onClick={handleAddColor}>
                Add Color
              </Button>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {newSize.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-block w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></span>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleRemoveColor(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default AddProduct;
