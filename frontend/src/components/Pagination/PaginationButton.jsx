import React from "react";

const PaginationButton = ({ page, isSelected, onClick }) => {
  return (
    <button
      className={`min-w-8 min-h-8 sm:min-w-14 sm:min-h-14 rounded-md text-sm ${
        isSelected
          ? "bg-black text-white"
          : "bg-white text-black lg:hover:bg-gray-200 lg:hover:text-black"
      }`}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

export default PaginationButton;
