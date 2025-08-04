import React from "react";
import PaginationButton from "./PaginationButton.jsx";

const PaginationList = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-10 items-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationButton
          key={index}
          page={index + 1}
          isSelected={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        />
      ))}
    </div>
  );
};

export default PaginationList;
