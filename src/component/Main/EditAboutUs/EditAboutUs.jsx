/* eslint-disable no-dupe-keys */
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Form, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  useGetAboutUsQuery,
  useAddAboutUsMutation,
} from "../../../redux/features/settings/settingsApi";
import { toast } from "sonner";
import CustomButton from "../../../utils/CustomButton";
import JoditEditor from "jodit-react";

const EditAboutUs = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState(""); // State for About Us content
  const navigate = useNavigate();

  // Fetch About Us content
  const { data: responseData, isLoading } = useGetAboutUsQuery();
  const [updateAboutUs, { isLoading: isUpdating }] = useAddAboutUsMutation();

  // Populate content once fetched
  useEffect(() => {
    if (responseData?.aboutUs) {
      setContent(responseData.aboutUs);
    }
  }, [responseData]);

  const handleSubmit = async () => {
    try {
      const response = await updateAboutUs({
        aboutUs: content,
      }).unwrap();
      toast.success(response?.message || "About Us updated successfully.");
      navigate("/settings");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update About Us.");
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit About Us</h1>
        </div>
      </div>

      {/* Spinner while loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full ">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* JoditEditor for About Us Content */}
            <Form.Item label="About Us Content">
              <JoditEditor
                value={content}
                onChange={(value) => setContent(value)}
                config={{
                  readonly: false,
                  height: 650,
                }}
              />
            </Form.Item>

            {/* Update Button */}
            <div className="flex justify-end">
              <CustomButton loading={isUpdating}>
                {isUpdating ? "Updating..." : "Update"}
              </CustomButton>
            </div>
          </Form>
        </div>
      )}
    </section>
  );
};

export default EditAboutUs;
