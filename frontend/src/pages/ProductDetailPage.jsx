import { useSearchParams } from "react-router";
import NotFoundPage from "./NotFoundPage.jsx";
import ProductData from "../components/ProductDetail/ProductData.jsx";
import MockupData from "../mocks/MockupData.js";

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  if (!productId) {
    return <NotFoundPage />;
  }

  const product = MockupData.homeProductListData.find(
    (product) => product.id === productId
  );

  if (!product) {
    return <NotFoundPage />;
  }

  const images = MockupData.imagePreviewData;

  return (
    <div className="w-full flex flex-col items-center">
      <ProductData product={product} images={images} />
    </div>
  );
};

export default ProductDetailPage;
