import { OutlineButton } from "../../../components";
import { useNavigate } from "react-router-dom";
import PATH from "../../../routes/path.js";
import { ProductsList } from "../../products/components";

const HomeProductsList = ({ productList }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto mt-14">
      <div className="flex flex-col gap-8 items-center w-full">
        <p className="text-2xl font-bold">Our Products</p>
        <ProductsList productList={productList} />
      </div>
      <div className="flex justify-center mt-8">
        <OutlineButton onClick={() => navigate(PATH.PRODUCTS)}>
          Show More
        </OutlineButton>
      </div>
    </div>
  );
};

export default HomeProductsList;
