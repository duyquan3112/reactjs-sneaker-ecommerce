import { ProductCard } from "../../../components";
import { useNavigate } from "react-router-dom";
import PATH from "../../../routes/path.js";

const ProductsList = ({ productList }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 sm:w-full px-3 sm:px-4">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => {
            navigate(`${PATH.PRODUCT_DETAIL}?id=${product.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default ProductsList;
