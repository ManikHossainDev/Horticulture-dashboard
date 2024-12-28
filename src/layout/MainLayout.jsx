import { Outlet } from "react-router-dom";
import Sidebar from "../component/Main/Sidebar/Sidebar";
import Header from "../component/Main/Header/Header";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
        <Header toggleSidebar={toggleSidebar} />
      <main className="w-full h-full flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <section className="w-full h-full md:ml-[300px] px-5">
        <Outlet />
      </section>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </main>
    </div>
  );
};
export default MainLayout;
