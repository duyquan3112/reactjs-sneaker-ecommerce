import ProductGroup from "./ProductGroup.jsx";
import HomeProductList from "./HomeProductList.jsx";

const Products = () => {
  return (
    <div className="w-[80%] mx-auto mt-14 mb-14">
      <ProductGroup />
      <HomeProductList />
    </div>
  );
};

export default Products;
