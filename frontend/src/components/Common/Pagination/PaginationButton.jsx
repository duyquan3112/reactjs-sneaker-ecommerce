import React from "react";

const PaginationButton = ({ page, isSelected, onClick }) => {
  return (
    <button
      className={`w-8 h-8 sm:w-14 sm:h-14 rounded-md text-sm transition-all duration-300 ease-in-out ${
        isSelected
          ? "bg-black text-white"
          : "bg-white text-black hover:bg-gray-200 hover:text-black"
      }`}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

export default PaginationButton;
