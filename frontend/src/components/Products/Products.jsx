import ProductGroup from "./ProductGroup.jsx";
import HomeProductList from "./HomeProductList.jsx";
import NewArrivalProduct from "./NewArrivalProduct.jsx";
import CustomerFeedback from "./CustomerFeedback.jsx";

const Products = () => {
  return (
    <div className="w-screen flex flex-col gap-8 pt-14 pb-14">
      <div className="w-[80%] mx-auto">
        <ProductGroup />
        <HomeProductList />
      </div>
      <NewArrivalProduct />
      <CustomerFeedback />
    </div>
  );
};

export default Products;
