import { Pagination, Spin } from "antd";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import ProductCard from "./ProductCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { useState } from "react";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery({
    page: currentPage,
    limit,
  });

  const allItems = responseData?.results;
  const totalResults = responseData?.totalResult;

  let content = null;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (isError && error) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (!allItems?.length) {
    content = <NoDataFound message={"No Products Found"} />;
  } else {
    content = (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
        {allItems?.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>
    );
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="flex justify-between items-center py-[19px] border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold ">All Products</h1>
        <Link to={`/product/add-product`}>
          <button className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Product
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
    </>
  );
};

export default Product;
