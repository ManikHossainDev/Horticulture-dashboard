import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { TbTrash } from "react-icons/tb";
import { useAddSubscriptionMutation } from "../../../redux/features/subscriptions/subscriptionsApi";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const AddSubscription = () => {
  const [form] = Form.useForm();
  const [addSubscription, { isLoading }] = useAddSubscriptionMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        benefits: values.benefits.map((benefit) => benefit?.benefit), // Transforming benefits to { benefit: 'text' }
      };

      await addSubscription(formattedValues).unwrap();
      toast.success("Subscription Added Successfully");
      navigate("/subscription");
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/subscription">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Add New Subscription Plan</h1>
        </div>
      </div>
      <Form
        form={form}
        name="add-subscription"
        onFinish={onFinish}
        layout="vertical"
      >
        {/* Subscription Name */}
        <Form.Item
          name="name"
          label="Subscription Name"
          rules={[
            { required: true, message: "Please enter subscription name!" },
          ]}
        >
          <CustomInput placeholder="Enter subscription name" />
        </Form.Item>

        {/* Duration */}
        <Form.Item
          name="duration"
          label="Subscription Duration (Months)"
          rules={[
            { required: true, message: "Please enter subscription duration!" },
          ]}
        >
          <CustomInput placeholder="Enter subscription duration in month" />
        </Form.Item>

        {/* Price */}
        <Form.Item
          name="price"
          label="Subscription Price"
          rules={[
            { required: true, message: "Please enter subscription price!" },
          ]}
        >
          <CustomInput placeholder="Enter subscription price" />
        </Form.Item>

        {/* Max Listings */}
        <Form.Item
          name="maxListings"
          label="Max Listings"
          rules={[
            { required: true, message: "Please enter max number of listings!" },
          ]}
        >
          <CustomInput placeholder="Enter max listings" />
        </Form.Item>

        {/* Benefits (Dynamic List) */}
        <Form.List
          name="benefits"
          initialValue={[""]}
          rules={[
            {
              validator: async (_, benefits) => {
                if (!benefits || benefits.length < 1) {
                  return Promise.reject(
                    new Error("At least one benefit is required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="w-full flex items-center justify-between gap-5"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "benefit"]}
                    rules={[
                      { required: true, message: "Please enter a benefit!" },
                    ]}
                    className="w-full"
                  >
                    <CustomInput
                      placeholder="Enter benefit"
                      className="w-full"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <TbTrash
                    className="text-red-500 size-8 cursor-pointer -mt-7"
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Benefit
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item>
          <CustomButton loading={isLoading}>Add Subscription</CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddSubscription;
