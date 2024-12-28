import { Form } from "antd";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useAddFaqMutation } from "../../../redux/features/faq/faqApi";
import { toast } from "sonner";
import { IoChevronBack } from "react-icons/io5";

const AddFaq = () => {
  const [form] = Form.useForm();
  const [addFaq, { isLoading }] = useAddFaqMutation();
  const navigate = useNavigate();

  // Handle Form Submission
  const handleSubmit = async (values) => {
    try {
      await addFaq(values).unwrap(); // Add FAQ
      toast.success("FAQ Added Successfully");
      navigate("/faq"); // Navigate to the FAQ list after successful addition
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
          <h1 className="text-2xl font-semibold">Add Faq</h1>
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
            {isLoading ? "Adding..." : "Add FAQ"}
          </CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddFaq;
