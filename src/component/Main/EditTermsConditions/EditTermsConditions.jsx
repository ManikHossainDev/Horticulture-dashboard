import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Form, Spin } from "antd";
import { useEffect, useState, useRef } from "react";
import {
  useGetTermsAndConditionsQuery,
  useAddTermsAndConditionsMutation,
} from "../../../redux/features/settings/settingsApi";
import { toast } from "sonner";
import CustomButton from "../../../utils/CustomButton";
import JoditEditor from "jodit-react"; // Import Jodit Editor

const EditTermsConditions = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const editor = useRef(null); // Create a ref for the Jodit Editor

  // Fetch Terms and Conditions content
  const { data: responseData, isLoading } = useGetTermsAndConditionsQuery();
  const [updateTermsAndConditions, { isLoading: isUpdating }] =
    useAddTermsAndConditionsMutation();

  // Populate content once fetched
  useEffect(() => {
    if (responseData?.termsConditions) {
      setContent(responseData.termsConditions);
    }
  }, [responseData]);

  const handleSubmit = async () => {
    try {
      const response = await updateTermsAndConditions({
        termsConditions: content,
      }).unwrap();
      toast.success(
        response?.message || "Terms and Conditions updated successfully."
      );
      navigate("/settings");
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to update Terms and Conditions."
      );
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
          <h1 className="text-2xl font-semibold">Edit Terms and Conditions</h1>
        </div>
      </div>

      {/* Spinner while loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Spin />
        </div>
      ) : (
        <div className="w-full rounded-lg bg-white">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* JoditEditor for Terms and Conditions Content */}
            <Form.Item>
              <JoditEditor
                ref={editor} // Attach the ref to the JoditEditor
                value={content}
                onChange={(newContent) => setContent(newContent)} // Handle changes
                config={{
                  readonly: false,
                  height: 650,
                  toolbar: true,
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

export default EditTermsConditions;
