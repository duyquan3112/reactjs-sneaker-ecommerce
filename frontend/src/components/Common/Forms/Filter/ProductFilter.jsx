import React, { useState, useCallback } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";

const ProductFilter = () => {
  const [sortBy, setSortBy] = useState("newest");
  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <div className="w-full bg-topbar-black">
      <div className="w-full sm:w-[80%] flex justify-between items-center mx-auto py-2 px-4">
        <button className="flex items-center gap-1">
          <MdOutlineFilterAlt className="text-white h-6 w-6" />
          <p className="text-white text-sm">Filter</p>
        </button>
        <div className="flex items-center gap-2">
          <p className="text-white text-sm">Sort by</p>
          <select
            name="sortBy"
            id="product-sort-by"
            value={sortBy}
            onChange={handleSortChange}
            className="text-black text-sm bg-white rounded-sm px-2 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductFilter);
