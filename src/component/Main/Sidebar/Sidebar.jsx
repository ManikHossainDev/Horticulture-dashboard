/* eslint-disable react/prop-types */
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import {PiCurrencyCircleDollar, PiUsers, PiUsersThree } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { BiCalendarEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import { GoDatabase } from "react-icons/go";
import { FaRegFileImage } from "react-icons/fa";
import { FaQ } from "react-icons/fa6";
import { MdOutlineCategory, MdOutlineMedicalServices, MdSubscriptions } from "react-icons/md";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const sidebarItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LuLayoutDashboard className="size-8" />,
  },
  {
    path: "/businesses",
    name: "All Businesses",
    icon: <PiUsers className="size-7" />, // Icon added here
  },
  {
    path: "/users",
    name: "All Users",
    icon: <PiUsersThree className="size-8" />,
  },
  {
    path:"/category",
    name:"Category",
    icon:<MdOutlineCategory className="size-7"/>
  },
  {
    path: "/product",
    name: "Product",
    icon: <GoDatabase className="size-7" />,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: <BiCalendarEdit className="size-8" />,
  },
  {
    path: "/earnings",
    name: "Earnings",
    icon: <PiCurrencyCircleDollar className="size-8" />,
  },
  {
    path: "/subscription",
    name:"Subscription",
    icon:<MdSubscriptions className="size-7"/>
  },
  {
    path:"/bannerImage",
    name:"Banner Image",
    icon:<FaRegFileImage className="size-7"/>
  },
  {
    path:"/service",
    name:"Service",
    icon:<MdOutlineMedicalServices className="size-7"/>
  },
  {
    path:'/faq',
    name:"FAQ",
    icon:<FaQ className="size-7"/>
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsOutline className="size-8" />,
  },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[300px] h-[90vh] bg-[#FFFFFF] fixed  overflow-y-scroll scrollbar-hiddenshadow-2xl">
        <div className="flex justify-between items-center p-4 bg-[#F8F9FA] rounded-lg shadow-md">
          {/* User Profile Image and Details */}
          <div className="flex items-center gap-3 px-5">
            {/* User Profile Image */}
            <img
              src={`${imageBaseUrl}${user?.image}`} // Use the user image URL
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
            />

            {/* User Name and Role */}
            <div className="flex flex-col">
              <h2 className="text-md font-semibold text-gray-800">
                <span className="font-normal">{user?.fullName}</span>
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-normal">{user?.role}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-gray-500 mb-5" />
        <ul className="w-full flex flex-col gap-2 ">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#F3F8FC] border-l-4 border-primary px-10 py-4 flex items-center gap-3 text-primary"
                  : "px-10 py-4 flex items-center gap-3 text-black"
              }
            >
              {item?.icon}
              <h>{item.name}</h>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-10 py-4 text-rose-500 pb-10"
        >
          <IoIosLogOut className="size-8" />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-[#3FB249] shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
          <img
            src="/src/assets/04.svg"
            alt="Logo"
            className="size-14 object-cover rounded-full mb-5"
          />
        </div>
        <div className="w-full h-[2px] bg-[#f7cc50] mb-5" />
        <ul className="w-full flex flex-col gap-3">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={toggleSidebar} // Close sidebar on link click
              className={({ isActive }) =>
                `px-10 py-4 flex items-center gap-3 text-white relative ${
                  isActive
                    ? "bg-[#F3F8FC] border-l-4 border-[#f7cc50] after:left-0 after:top-0 after:bottom-0 after:w-[15px] after:bg-[#fbfdfd] after:absolute after:rounded-tr-lg after:rounded-br-lg"
                    : ""
                }`
              }
            >
              {item?.icon}
              <h className="text-black">{item.name}</h>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={() => {
            handleLogout();
            toggleSidebar();
          }}
          className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-5"
        >
          <IoIosLogOut className="size-8" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
