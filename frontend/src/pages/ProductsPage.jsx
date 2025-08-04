import PageBanner from "../components/Banners/Common/PageBanner.jsx";
import MockupData from "../mocks/MockupData.js";
import ProductList from "../components/Products/ProductList.jsx";
import ProductFilter from "../components/Common/Forms/Filter/ProductFilter.jsx";
import { useState } from "react";
import PaginationList from "../components/Common/Pagination/PaginationList.jsx";

const ProductsPage = () => {
  const productList = MockupData.homeProductListData;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full flex flex-col items-center">
      <PageBanner title="Products" bannerImage={MockupData.pageBannerImage} />
      <ProductFilter />
      <div className="w-full sm:w-[80%] mx-auto mt-14 mb-6 px-0 sm:px-4 flex justify-center">
        <ProductList productList={productList} />
      </div>
      <div className="w-full sm:w-[80%] mx-auto mt-14 mb-6 px-0 sm:px-4 flex justify-center">
        <PaginationList
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
