import { Form, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useAddPrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} from "../../../redux/features/settings/settingsApi";
import CustomButton from "../../../utils/CustomButton";

const EditPrivacyPolicy = () => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { data: responseData, isLoading } = useGetPrivacyPolicyQuery();
  const [addPrivacyPolicy, { isLoading: isMutating }] =
    useAddPrivacyPolicyMutation();

  // Set the editor content when the response data is loaded
  useEffect(() => {
    if (responseData?.privacyPolicy) {
      setContent(responseData.privacyPolicy);
    }
  }, [responseData]);

  const handleSubmit = async () => {
    try {
      const response = await addPrivacyPolicy({
        privacyPolicy: content,
      }).unwrap();
      toast.success(response?.message);
      navigate("/settings");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Privacy Policy</h1>
        </div>
      </div>

      {/* Spinner while loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full rounded-lg bg-white">
          {/* Form Section */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Jodit Editor for Privacy Policy Content */}
            <Form.Item>
              <JoditEditor
                ref={editor}
                value={content}
                config={{
                  readonly: false,
                  height: 650,
                }}
                onBlur={(newContent) => setContent(newContent)} // Update content on blur
              />
            </Form.Item>

            {/* Update Button */}
            <div className="flex justify-end">
              <CustomButton loading={isMutating}>
                {isMutating ? "Updating..." : "Update"}
              </CustomButton>
            </div>
          </Form>
        </div>
      )}
    </section>
  );
};

export default EditPrivacyPolicy;
