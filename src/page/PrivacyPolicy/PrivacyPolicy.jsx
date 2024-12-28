import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useGetPrivacyPolicyQuery } from "../../redux/features/settings/settingsApi";
import { Spin } from "antd";
const PrivacyPolicy = () => {
  const { data: responseData, isLoading } = useGetPrivacyPolicyQuery();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Spin />
      </div>
    );
  }
  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-4 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </div>
        <Link to={"/settings/edit-privacy-policy"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>
      {/* Your privacy policy content goes here */}
      <div
        dangerouslySetInnerHTML={{ __html: responseData?.privacyPolicy }}
      ></div>
    </section>
  );
};

export default PrivacyPolicy;
