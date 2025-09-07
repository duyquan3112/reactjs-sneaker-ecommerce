import MockupData from "../utils/MockupData.js";
import { ProductsList, ProductsFilter } from "../features/products/components";
import { PaginationList, PageBanner } from "../components";

const ProductsPage = () => {
  const productList = MockupData.homeProductListData;
  const handlePageChange = (page) => {
    console.log(page);
  };
  return (
    <div className="w-full flex flex-col items-center">
      <PageBanner title="Products" bannerImage={MockupData.pageBannerImage} />
      <ProductsFilter />
      <div className="w-full sm:w-[80%] mx-auto mt-14 mb-6 px-0 sm:px-4 flex justify-center">
        <ProductsList productList={productList} />
      </div>
      <div className="w-full sm:w-[80%] mx-auto mt-14 mb-6 px-0 sm:px-4 flex justify-center">
        <PaginationList totalPages={20} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ProductsPage;
