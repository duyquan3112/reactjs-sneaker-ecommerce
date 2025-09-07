import React from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import ProductsSortDropdown from "./ProductsSortDropdown.jsx";

const ProductsFilter = () => {
  const handleSortChange = (sortBy) => {
    console.log(sortBy);
  };
  return (
    <div className="w-full bg-topbar-black">
      <div className="w-full sm:w-[80%] flex justify-between items-center mx-auto py-2 px-4">
        <button className="flex items-center gap-1">
          <MdOutlineFilterAlt className="text-white h-6 w-6" />
          <p className="text-white text-sm">Filter</p>
        </button>
        <ProductsSortDropdown onSortChange={handleSortChange} />
      </div>
    </div>
  );
};

export default React.memo(ProductsFilter);
