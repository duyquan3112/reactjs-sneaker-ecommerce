import { useSearchParams } from "react-router";
import NotFoundPage from "./NotFoundPage.jsx";

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  if (!productId) {
    return <NotFoundPage />;
  }

  return <div>ProductDetailPage</div>;
};

export default ProductDetailPage;
