import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../../utils/CustomButton";
import { useGetAboutUsQuery } from "../../../redux/features/settings/settingsApi";
const AboutUs = () => {
  const {data:responseData} = useGetAboutUsQuery();

  return (
    <section className="w-full h-full pb-5">
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">About Us</h1>
        </div>
        <Link to={"/settings/edit-about-us"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>
      {/* Your privacy policy content goes here */}
      <div dangerouslySetInnerHTML={{ __html: responseData?.aboutUs }}></div>
    </section>
  );
};

export default AboutUs;
