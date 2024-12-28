/* eslint-disable react/prop-types */
import noData from "../../../assets/nodata/no-data-found.jpg";

const NoDataFound = ({message}) => {
  return (
    <div>
      <img
        src={noData}
        alt="No Data Found"
        className="w-[200px] h-[200px] mx-auto"
      />
      <p className="text-center text-gray-600 font-semibold">
       {message || "No results found"} 
      </p>
    </div>
  );
};

export default NoDataFound;
