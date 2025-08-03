import MockupData from "../../mocks/MockupData.js";
import ProductCard from "../Common/Cards/ProductCard.jsx";
import OutlineButton from "../Common/Buttons/OutlineButton.jsx";

const HomeProductList = () => {
  const productList = MockupData.homeProductListData;
  return (
    <div className="w-full mx-auto mt-14">
      <div className="flex flex-col gap-8 items-center w-full">
        <p className="text-2xl font-bold">Our Products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-[20rem] sm:w-full px-4 sm:px-0">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <OutlineButton>Show More</OutlineButton>
      </div>
    </div>
  );
};

export default HomeProductList;
