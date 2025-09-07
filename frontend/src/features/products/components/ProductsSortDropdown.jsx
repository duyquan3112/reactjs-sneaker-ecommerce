import React, { useState } from "react";

const ProductsSortDropdown = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState("newest");
  const handleSortChange = (e) => {
    if (sortBy === e.target.value) return;
    setSortBy(e.target.value);
    onSortChange(e.target.value);
  };
  return (
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
  );
};

export default ProductsSortDropdown;
