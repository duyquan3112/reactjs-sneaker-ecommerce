import React, { useState, useEffect } from "react";
import PaginationButton from "./PaginationButton.jsx";
import useWindowSize from "../../../hooks/useWindowSize.jsx";
import ChangePageButton from "./ChangePageButton.jsx";
import { scrollToPosition } from "../../../utils/ScrollUtil.js";
import AppConstants from "../../../constants/AppConstants.js";

const PaginationList = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerHeight, setBannerHeight] = useState(0);
  const { width } = useWindowSize();
  const isMobile = width < AppConstants.mobileWidth;

  useEffect(() => {
    const bannerHeight =
      document.getElementById("page-banner").offsetHeight || 0;
    setBannerHeight(bannerHeight);
  }, []);

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    onPageChange(page);
    scrollToPosition(bannerHeight);
  };

  const renderButtonList = () => {
    const pageList = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageList.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageList.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageList.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages - 1,
          totalPages
        );
      }
    }

    return pageList.map((page, index) =>
      page === "..." ? (
        <div
          key={index}
          className="w-8 h-8 sm:w-14 sm:h-14 flex items-center justify-center"
        >
          <span className="text-gray-500 font-semibold">...</span>
        </div>
      ) : (
        <PaginationButton
          key={index}
          page={page}
          isSelected={currentPage === page}
          onClick={() => handlePageChange(page)}
        />
      )
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 w-full mx-auto">
      <ChangePageButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      >
        {isMobile ? "<" : "Prev"}
      </ChangePageButton>

      {isMobile && (
        <span className="text-sm font-semibold text-gray-800 mx-2">
          {currentPage} / {totalPages}
        </span>
      )}
      {!isMobile && (
        <div className="flex items-center justify-center gap-2 w-full max-w-lg min-w-[420px]">
          {renderButtonList()}
        </div>
      )}

      <ChangePageButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
      >
        {isMobile ? ">" : "Next"}
      </ChangePageButton>
    </div>
  );
};

export default PaginationList;
