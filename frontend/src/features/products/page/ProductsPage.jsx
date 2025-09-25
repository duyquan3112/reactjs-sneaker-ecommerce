import MockupData from "../../../utils/MockupData.js";
import {
  PaginationList,
  PageBanner,
  CircularLoading
} from "../../../components";
import { lazy, useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import AppConstants from "../../../constants/AppConstants.js";
import { useDebounce } from "../../../hooks";
import { ScrollUtil } from "../../../utils";
import { useSearchParams } from "react-router-dom";
// Lazy load components
const ProductsFilter = lazy(() => import("../components/ProductsFilter.jsx"));
const ProductsList = lazy(() => import("../components/ProductsList.jsx"));

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shouldScroll, setShouldScroll] = useState(false);
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const debouncedPage = useDebounce(pageParam, 350);
  const [bannerHeight, setBannerHeight] = useState(0);

  const {
    data: response,
    isPending,
    isError,
    isFetching
  } = useProducts({
    params: {
      pageSize: AppConstants.defaultPageSize,
      page: debouncedPage
    }
  });

  useEffect(() => {
    const bannerHeight =
      document.getElementById("page-banner")?.offsetHeight || 0;
    setBannerHeight(bannerHeight);
  }, []);

  useEffect(() => {
    if (!isFetching && shouldScroll) {
      ScrollUtil.scrollToPosition(bannerHeight);
      setShouldScroll(false);
    }
  }, [isFetching, bannerHeight, shouldScroll]);

  const productList = response?.data || [];

  const handlePageChange = (page) => {
    setSearchParams({ page });
    setShouldScroll(true);
  };

  if (isError) {
    throw new Error();
  }

  return (
    <>
      {isPending ? (
        <CircularLoading />
      ) : (
        <div className="w-full flex flex-col items-center">
          <PageBanner
            title="Products"
            bannerImage={MockupData.pageBannerImage}
          />
          <ProductsFilter />
          <div className="w-full sm:w-[80%] mx-auto mt-14 mb-6 px-0 sm:px-4 flex justify-center">
            <ProductsList productList={productList} />
          </div>
          <div className="w-full sm:w-[80%] mx-auto mt-14 mb-6 px-0 sm:px-4 flex justify-center">
            <PaginationList
              totalPages={20}
              onPageChange={handlePageChange}
              initialPage={pageParam}
              isFetching={isFetching}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
