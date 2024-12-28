import { useEffect } from "react";
import { Form } from "antd";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
} from "../../../redux/features/faq/faqApi";
import { IoChevronBack } from "react-icons/io5";

const EditFaq = () => {
  const [form] = Form.useForm();
  const { id } = useParams(); // Get the FAQ ID from the URL
  const navigate = useNavigate();
  const { data: faqData } = useGetSingleFaqQuery(id);
  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  // Set form fields with fetched data when available
  useEffect(() => {
    if (faqData) {
      form.setFieldsValue({
        question: faqData.question,
        answer: faqData.answer,
      });
    }
  }, [faqData, form]);

  // Handle Form Submission
  const handleSubmit = async (values) => {
    try {
      await updateFaq({ id, data: values }).unwrap(); // Update FAQ
      toast.success("FAQ Updated Successfully");
      navigate("/faq"); // Navigate to the FAQ list after successful update
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
          <h1 className="text-2xl font-semibold">Edit Faq</h1>
        </div>
      </div>

      {/* FAQ Form */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Question Field */}
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: "Please enter the question" }]}
        >
          <CustomInput placeholder="Enter question" />
        </Form.Item>

        {/* Answer Field */}
        <Form.Item
          name="answer"
          label="Answer"
          rules={[{ required: true, message: "Please enter the answer" }]}
        >
          <CustomInput isTextArea rows={4} placeholder="Enter answer" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <CustomButton loading={isLoading}>
            {isLoading ? "Updating..." : "Update FAQ"}
          </CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditFaq;
