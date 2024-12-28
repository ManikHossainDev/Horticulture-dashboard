/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { MdOutlineNotificationsActive } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { FaShoppingCart } from "react-icons/fa";
import { Input, Form } from "antd";
import { IoIosSearch } from "react-icons/io";

const { Item } = Form;

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-18 px-5 bg-[#42B244] flex justify-between items-center text-white sticky top-0 left-0 z-10 shadow-md">
      <div className="flex items-center gap-3 space-y-1 md:space-y-0">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        {/* Logo Image */}
        <img
          src="https://i.ibb.co.com/W2MHMgd/log.png"
          alt="Logo"
          className="size-12 md:size-12 object-cover rounded-full"
        />
      </div>

      <div className="flex items-center gap-3">
          {/* Notifications Icon */}
          <Link to={"/notification"} className="relative">
            <MdOutlineNotificationsActive className="size-8" />
          </Link>
          {/* User Profile Section */}
          <div className="flex items-center gap-2  p-1 md:p-4">
            <img
              onClick={() => navigate("/personal-info")}
              src={`${imageBaseUrl}${user?.image}`}
              className="size-14 rounded-full cursor-pointer object-cover "
              alt="User Profile"
            />
            <p className="whitespace-nowrap truncate cursor-pointer">
              {user?.fullName}
            </p>
          </div>
        </div>
    </div>
  );
};

export default Header;
