import { useSearchParams } from "react-router";
import { NotFoundPage } from "../components";
import { ProductDetailData } from "../features/product-detail/components";
import MockupData from "../utils/MockupData.js";

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
      <ProductDetailData product={product} images={images} />
    </div>
  );
};

export default ProductDetailPage;
