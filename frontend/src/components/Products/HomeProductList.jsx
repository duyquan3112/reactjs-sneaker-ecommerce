import MockupData from "../../mocks/MockupData.js";
import OutlineButton from "../Common/Buttons/OutlineButton.jsx";
import { useNavigate } from "react-router";
import PATH from "../../routes/path.js";
import ProductList from "./ProductList.jsx";

const HomeProductList = () => {
  const productList = MockupData.homeProductListData;
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto mt-14">
      <div className="flex flex-col gap-8 items-center w-full">
        <p className="text-2xl font-bold">Our Products</p>
        <ProductList productList={productList} />
      </div>
      <div className="flex justify-center mt-8">
        <OutlineButton onClick={() => navigate(PATH.PRODUCTS)}>
          Show More
        </OutlineButton>
      </div>
    </div>
  );
};

export default HomeProductList;
