import { Pagination, Spin } from "antd";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import NoDataFound from "../NoDataFound/NoDataFound";
import { useState } from "react";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const { data: responseData, isLoading, isError } = useGetAllCategoriesQuery({
    page: currentPage,
    limit,
  });
  const allCategories = responseData?.results;
  const totalResults = responseData?.totalResults;
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
  } else if (!allCategories?.length) {
    content = <NoDataFound message={"No Categories Found"} />;
  } else {
    content = (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
        {allCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    );
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <section >
      <div className="flex justify-between items-center py-[19px] border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold ">All Categories</h1>
        <Link to={`/category/add-category`}>
          <button className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Category
          </button>
        </Link>
      </div>
      {content}
      {totalResults > limit && (
        <div className="flex justify-center my-6">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={totalResults}
            showSizeChanger={false}
          />
        </div>
      )}
    </section>
  );
};

export default Category;
