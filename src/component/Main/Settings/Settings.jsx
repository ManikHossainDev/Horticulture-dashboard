/* eslint-disable react/no-unescaped-entities */

import { Form, Modal, Switch } from "antd";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();
  const settingsItem = [
    {
      title: "Change password",
      path: "change-password",
    },

    {
      title: "Privacy Policy",
      path: "privacy-policy",
    },
    {
      title: "Terms & Conditions",
      path: "terms-conditions",
    },
    // {
    //   title: "About us",
    //   path: "about-us",
    // },
  ];
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();
  const [forgotPassword, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVeirfyOtpLoading }] =
    useVerifyEmailMutation();
  const [resetPassword, { isLoading: isResetPasswordLoading }] =
    useResetPasswordMutation();

  const handleNavigate = (value) => {
    if (value === "notification") {
      return;
    } else if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };

  const handleChangePassword = async (values) => {
    const { oldPassword, newPassword } = values;
    try {
      const res = await changePassword({
        currentPassword: oldPassword,
        newPassword,
      }).unwrap();
      setIsModalOpen(false);
      toast.success(res?.message);
      navigate("/auth");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const handleForgetPassword = async (values) => {
    try {
      const res = await forgotPassword(values).unwrap();
      toast.success(res?.data?.message);
      setModelTitle("Verify OTP");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({
        email: user?.email,
        oneTimeCode: otp,
      }).unwrap();
      toast.success("OTP verified successfully");
      setModelTitle("Reset Password");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const handleResetPassword = async (values) => {
    const { newPassword } = values;
    try {
      await resetPassword({
        email: user?.email,
        newPassword,
      }).unwrap();
      toast.success("Password reset successfully");
      navigate("/auth");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="w-full h-full">
       <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
       </div>
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="w-full p-4 mb-2 text-sm rounded-lg border   flex items-center justify-between cursor-pointer "
          onClick={() => handleNavigate(setting.path)}
        >
          <h2>{setting.title}</h2>
          <h2>
            {setting.path === "notification" ? (
              <Switch defaultChecked />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </h2>
        </div>
      ))}
      <Modal
        title={
          <div
            onClick={() => setIsModalOpen(false)}
            className="flex items-center cursor-pointer text-black"
          >
            <h1 className="text-xl  font-medium  mb-5">{modelTitle}</h1>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        centered
      >
        {modelTitle === "Change password" && (
          <div className="w-full px-5 ">
            <p className="text-[14px] mb-[14px]">
              Your password must be 8-10 character long.
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Old Password!",
                  },
                ]}
              >
                <CustomInput
                  isPassword
                  type="password"
                  placeholder="Enter Your old Password"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your New Password!",
                  },
                ]}
              >
                <CustomInput
                  isPassword
                  type="password"
                  placeholder="Set Your New Password"
                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Re-enter Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <CustomInput
                  isPassword
                  type="password"
                  placeholder="Re-enter password"
                />
              </Form.Item>
              <p className=" text-secondary font-medium">
                <button onClick={() => setModelTitle("Forget password")}>
                  <h1 className="underline text-blue-500"> Forget Password</h1>
                </button>
              </p>
              <Form.Item>
                <CustomButton loading={isChangePasswordLoading}>
                  Update Password
                </CustomButton>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Forget password" && (
          <div className="w-full px-5">
            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={handleForgetPassword}
              className="space-y-7 fit-content object-contain"
            >
              <div className="">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <CustomInput type="email" placeholder="Enter your email" />
                </Form.Item>
              </div>
              <Form.Item>
                <CustomButton loading={isForgotPasswordLoading}>
                  Send Otp
                </CustomButton>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Verify OTP" && (
          <div className="w-full px-5">
            <form onSubmit={handleVerifyOtp}>
              <h1 className="text-lg">
                We'll send a verification code to your email. Check your inbox
                and enter the code here.
              </h1>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{
                  width: "60px",
                  height: "60px",
                  borderBottom: "1px solid #4E4E4E",
                  marginRight: "10px",
                  outline: "none",
                  color: "black",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              />
              <div className="mt-5">
                <CustomButton loading={isVeirfyOtpLoading}>Verify</CustomButton>
              </div>
              <div className="flex justify-between items-center my-4">
                <h1>Didn’t receive code?</h1>
                <button className="text-[#4c7e95]">Resend</button>
              </div>
            </form>
          </div>
        )}
        {modelTitle === "Reset Password" && (
          <div className="w-full px-5">
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-6 fit-content object-contain"
              onFinish={handleResetPassword}
            >
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your New Password!",
                  },
                ]}
              >
                <CustomInput
                  icon={HiOutlineLockClosed}
                  isPassword
                  type="password"
                  placeholder="Set Your New Password"
                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="confirmPassword"
                dependencies={["confirmPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Input Confirm Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <CustomInput
                  icon={HiOutlineLockClosed}
                  isPassword
                  type="password"
                  placeholder="Set Your New Password"
                />
              </Form.Item>
              <Form.Item>
                <CustomButton
                  loading={isResetPasswordLoading}
                  border
                  className="w-full"
                >
                  Reset Password
                </CustomButton>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Settings;
