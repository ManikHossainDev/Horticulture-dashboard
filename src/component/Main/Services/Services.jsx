import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetServicesQuery } from "../../../redux/features/services/servicesApi";
import ServiceCard from "./ServiceCard";
import { FaPlus } from "react-icons/fa6";
import { Spin, Pagination } from "antd";
import NoDataFound from "../NoDataFound/NoDataFound";

const Services = () => {
  const [currentPage, setCurrentPage] = useState(1); // State to store current page
  const pageSize = 10; // Number of items per page

  // Fetch paginated data from the API
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetServicesQuery({
    page: currentPage,
    pageSize: pageSize,
  });

  const servicesData = responseData?.results;
  const totalResult = responseData?.totalResult; // Total number of services available

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  let content = null;

  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="w-full flex justify-center py-10">
        Something went wrong
      </div>
    );
  } else if (!servicesData?.length) {
    content = <NoDataFound message={"No Services Found"} />;
  } else {
    content = (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
        {servicesData?.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center py-[19px] border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold ">All Services</h1>
        <Link to={`/service/add-service`}>
          <button className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Service
          </button>
        </Link>
      </div>
      {content}

      {/* Pagination */}
      {totalResult > pageSize && (
        <div className="w-full flex justify-center mt-10">
          <Pagination
            current={currentPage}
            total={totalResult}
            pageSize={pageSize}
            onChange={onPageChange}
            showSizeChanger={false} // You can allow the user to change the page size if needed
          />
        </div>
      )}
    </section>
  );
};

export default Services;
