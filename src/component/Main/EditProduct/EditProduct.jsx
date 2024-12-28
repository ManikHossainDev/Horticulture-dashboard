import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select, Table } from "antd";
import { useState, useEffect } from "react";
import {
  useDeleteSingleImageMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../../redux/features/product/productApi";
import { useUpdateProductMutation } from "../../../redux/features/product/productApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { IoChevronBack } from "react-icons/io5";

const { Option } = Select;

const EditProduct = () => {
  const { id: productId } = useParams();
  const [form] = Form.useForm();
  const [sizes, setSizes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state to track editing mode
  const [currentSizeIndex, setCurrentSizeIndex] = useState(null); // Track index of the size being edited
  const [newSize, setNewSize] = useState({ size: "", price: "", colors: [] });
  const [newColor, setNewColor] = useState("#000000");
  const [productImages, setProductImages] = useState([]);
  const { data: productData } = useGetProductByIdQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: responseData} = useGetAllCategoriesQuery({
    page: 1,
    limit : 5000,
  });
  const allCategories = responseData?.results;
  const [addProductImage] = useUploadProductImageMutation();
  const [deleteProductImage] = useDeleteSingleImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        productName: productData?.product?.productName,
        productDescription: productData?.product?.productDescription,
        category: productData?.product?.category,
      });
      setSizes(productData?.product?.sizes || []);
      setProductImages(productData?.product?.productImages || []);
    }
  }, [productData, form]);

  const handleAddSize = () => {
    if (!newSize.size || !newSize.price) {
      return;
    }
    if (isEditing) {
      const updatedSizes = [...sizes];
      updatedSizes[currentSizeIndex] = newSize; // Update the size at the index
      setSizes(updatedSizes);
      setIsEditing(false); // Exit editing mode
      setCurrentSizeIndex(null); // Reset the index
    } else {
      setSizes([...sizes, newSize]);
    }
    setNewSize({ size: "", price: "", colors: [] });
    setIsModalOpen(false);
  };

  const handleEditSize = (index) => {
    setIsEditing(true);
    setCurrentSizeIndex(index);
    setNewSize(sizes[index]);
    setIsModalOpen(true);
  };

  const handleAddColor = () => {
    if (!newColor) return;
    setNewSize({ ...newSize, colors: [...newSize.colors, newColor] });
    setNewColor("#000000");
  };

  const handleRemoveColor = (index) => {
    const updatedColors = newSize.colors.filter((_, i) => i !== index);
    setNewSize({ ...newSize, colors: updatedColors });
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("productId", productId);
      files.forEach((file) => {
        formData.append("productImages", file);
      });
      try {
        await addProductImage(formData).unwrap();
      } catch (error) {
        toast.error(error?.data?.message || "Error updating product");
      }
    }
  };

  const handleRemoveImage = async (imageName) => {
    try {
      await deleteProductImage({ id: productId, imageName }).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleSubmit = async (values) => {
    if (productImages?.length < 2) {
      toast.error("Please upload at least 2 image");
      return;
    } else if (sizes?.length <= 0) {
      toast.error("Please add at least one size");
      return;
    }
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("productDescription", values.productDescription);
    formData.append("category", values.category);
    formData.append("sizes", JSON.stringify(sizes));

    try {
      const result = await updateProduct({
        id: productId,
        formdata: formData,
      }).unwrap();
      navigate("/product");
      toast.success(result?.data?.message || "Product updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Error updating product");
    }
  };

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
        <>
          <Button type="link" onClick={() => handleEditSize(index)}>
            <EditOutlined /> Edit
          </Button>
          <Button type="link" danger onClick={() => handleRemoveSize(index)}>
            <DeleteOutlined /> Remove
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
       <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/product">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Product</h1>
        </div>
      </div>
      {productData?.product && (
        <>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Product Images */}
            <div className="mb-6">
              <label className="text-gray-700 font-medium mb-2 block">
                Product Images
              </label>
              <div className="flex gap-4 flex-wrap items-center">
                {productImages?.map((img, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={`${imageBaseUrl}${img}`}
                      alt={`Product-${index}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <div
                      onClick={() => handleRemoveImage(img)}
                      className="absolute -top-2 -right-2 size-5 flex justify-center items-center bg-rose-500 text-white rounded-full p-1 cursor-pointer"
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                ))}
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

            <Form.Item
              name="productName"
              label="Product Name"
              rules={[
                { required: true, message: "Please enter the product name" },
              ]}
            >
              <CustomInput placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              name="productDescription"
              label="Product Description"
              rules={[
                {
                  required: true,
                  message: "Please enter the product description",
                },
              ]}
            >
              <CustomInput
                isTextArea
                rows={4}
                placeholder="Enter product description"
              />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select size="large" placeholder="Select a category">
                {allCategories?.map((category) => (
                  <Option key={category._id} value={category.categoryName}>
                    {category?.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

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
                dataSource={sizes?.map((size, index) => ({
                  ...size,
                  key: index,
                }))}
                pagination={false}
                bordered
              />
            </div>

            <Form.Item>
              <CustomButton loading={isUpdating}>Update Product</CustomButton>
            </Form.Item>
          </Form>

          <Modal
            title={isEditing ? "Edit Size" : "Add Size"}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            centered
            onOk={handleAddSize}
          >
            <Form layout="vertical">
              <Form.Item
                label="Size"
                rules={[{ required: true, message: "Please select a size" }]}
                required
              >
                <CustomInput
                  type="text"
                  value={newSize.size}
                  onChange={(e) =>
                    setNewSize({ ...newSize, size: e.target.value })
                  }
                  placeholder="Enter size"
                />
              </Form.Item>
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
                  {newSize?.colors.map((color, index) => (
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
        </>
      )}
    </div>
  );
};

export default EditProduct;
