import { createBrowserRouter } from "react-router-dom";
import AddCategory from "../component/Main/AddCategory/AddCategory";
import AddProduct from "../component/Main/AddProduct/AddProduct";
import AllBusinessman from "../component/Main/AllBusinesses/AllBusinesses";
import AllUsers from "../component/Main/AllUsers/AllUsers";
import Category from "../component/Main/Category/Category";
import EditCategory from "../component/Main/EditCategory/EditCategory";
import EditProduct from "../component/Main/EditProduct/EditProduct";
import Notification from "../component/Main/Notification/Notification";
import MainLayout from "../layout/MainLayout";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import Otp from "../page/Auth/Otp/Otp";
import SignIn from "../page/Auth/SignIn/SignIn";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import AdminRoutes from "./AdminRoutes";
import Orders from "../component/Main/Orders/Orders";
import Product from "../component/Main/Product/Product";
import PersonalInformation from "../component/Main/PersonalInformation/PersonalInformation";
import EditInformation from "../component/Main/EditPersonalInfo/EditPersonalInfo";
import Settings from "../component/Main/Settings/Settings";
import EditPrivacyPolicy from "../component/Main/EditPrivacyPolicy/EditPrivacyPolicy";
import TermsCondition from "../component/Main/TermsConditions/TermsCondition";
import AboutUs from "../component/Main/AboutUs/AboutUs";
import EditTermsConditions from "../component/Main/EditTermsConditions/EditTermsConditions";
import EditAboutUs from "../component/Main/EditAboutUs/EditAboutUs";
import PrivacyPolicy from "../page/PrivacyPolicy/PrivacyPolicy";
import BannerImage from "../component/Main/BannerImage/BannerImage";
import AddBannerImage from "../component/Main/AddBannerImage/AddBannerImage";
import EditBannerImage from "../component/Main/EditBannerImage/EditBannerImage";
import Services from "../component/Main/Services/Services";
import AddService from "../component/Main/AddService/AddService";
import EditService from "../component/Main/EditService/EditService";
import Faq from "../component/Main/Faq/Faq";
import AddFaq from "../component/Main/AddFaq/AddFaq";
import EditFaq from "../component/Main/EditFaq/EditFaq";
import Subscription from "../component/Main/Subscription/Subscription";
import AddSubscription from "../component/Main/AddSubscription/AddSubscription";
import EditSubscription from "../component/Main/EditSubscription/EditSubscription";
import Earnings from "../component/Main/Earnings/Earnings";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <MainLayout />
      </AdminRoutes>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "businesses",
        element: <AllBusinessman />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/add-category",
        element: <AddCategory />,
      },
      {
        path: "/category/edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/add-product",
        element: <AddProduct />,
      },
      {
        path: "product/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "earnings",
        element: <Earnings />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/subscription/add-subscription",
        element: <AddSubscription />,
      },
      {
        path: "/subscription/edit-subscription/:id",
        element: <EditSubscription />,
      },
      {
        path: "/bannerImage",
        element: <BannerImage />,
      },
      {
        path: "/bannerImage/add-banner-image",
        element: <AddBannerImage />,
      },
      {
        path: "/bannerImage/edit-banner-image/:id",
        element: <EditBannerImage />,
      },
      {
        path: "/service",
        element: <Services />,
      },
      {
        path: "/service/add-service",
        element: <AddService />,
      },
      {
        path: "/service/edit-service/:id",
        element: <EditService />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "/faq/add-faq",
        element: <AddFaq />,
      },
      {
        path: "/faq/edit-faq/:id",
        element: <EditFaq />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "personal-info",
        element: <PersonalInformation />,
      },
      {
        path: "edit-personal-info",
        element: <EditInformation />,
      },
      {},
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsCondition />,
      },
      {
        path: "settings/about-us",
        element: <AboutUs />,
      },
      {
        path: "settings/edit-privacy-policy",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/edit-terms-conditions",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/edit-about-us",
        element: <EditAboutUs />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
