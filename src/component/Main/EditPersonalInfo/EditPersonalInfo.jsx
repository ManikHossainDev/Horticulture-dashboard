import { Form } from "antd";
import { useEffect, useState } from "react";
import { IoChevronBack, IoCameraReverse } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useUpdateProfileImageMutation,
  useUpdateUserMutation,
} from "../../../redux/features/profile/profileApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/features/auth/authSlice";

const EditInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateProfileInfo, { isLoading }] = useUpdateUserMutation();
  const [updateImage] = useUpdateProfileImageMutation();
  const [imageUrl, setImageUrl] = useState(
    user?.image ? `${imageBaseUrl}${user.image}` : null
  );
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phoneNumber,
      });
    }
  }, [user, form]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const response = await updateImage(formData).unwrap();
      if (response?.attributes) {
        dispatch(updateUser({ user: response?.attributes }));
        toast.success("Profile image updated successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  const onFinish = async (values) => {
    const updateData = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phone,
    };
    try {
      const response = await updateProfileInfo(updateData);
      if (response.error) {
        toast.error(response.error.data.message);
      }
      if (response.data) {
        dispatch(updateUser({ user: response?.data?.attributes }));

        toast.success("Profile updated successfully!");
        navigate("/personal-info");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong while updating your profile.");
    }
  };
  return (
    <div className="w-full">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center my-6">
          <Link to="/personal-info">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Information</h1>
        </div>
      </div>

      {/* Profile Information */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
        {/* Profile Picture */}
        <div className="w-full col-span-full md:col-span-3 place-items-center flex justify-center items-center flex-col gap-3 relative">
          {/* Image preview */}
          <div className="size-[110px] relative group">
            <img
              src={imageUrl || `${imageBaseUrl}${user?.image}`}
              alt="logo"
              className="rounded-full size-[110px] absolute ring-4 ring-primary"
            />
            {/* Hover change label */}
            <label
              htmlFor="profileImage"
              className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300 rounded-full text-white"
            >
              <IoCameraReverse className="size-6" />
            </label>
          </div>
          {/* Hidden file input */}
          <input
            id="profileImage"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
          <h1 className="text-2xl font-semibold">{`${user?.fullName}`}</h1>
          <p className="text-gray-600 uppercase">{`${user?.role}`}</p>
        </div>

        {/* Edit Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="w-full col-span-full md:col-span-9 space-y-6 mt-10"
        >
          {/* Full Name */}
          <Form.Item label="Full Name" name="fullName">
            <CustomInput placeholder="Enter your full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item label="Email" name="email">
            <CustomInput placeholder="Enter your email" readOnly />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item label="Phone Number" name="phone">
            <CustomInput  placeholder="Enter your phone number" />
          </Form.Item>

          {/* Submit Button */}
          <CustomButton loading={isLoading} className="w-full">
            Update Information
          </CustomButton>
        </Form>
      </div>
    </div>
  );
};

export default EditInformation;
