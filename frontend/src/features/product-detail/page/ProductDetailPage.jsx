import { useSearchParams } from "react-router-dom";
import { NotFoundPage, CircularLoading } from "../../../components";
import MockupData from "../../../utils/MockupData.js";
import { lazy, useMemo } from "react";
import useProductDetail from "../hooks/useProductDetail";
import { VariantSelectionProvider } from "../providers/index.js";

const ProductDetailData = lazy(() =>
  import("../components/ProductDetailData.jsx")
);

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productId = useMemo(() => searchParams.get("id"), [searchParams]);

  const {
    data: response,
    isPending,
    isError,
    error
  } = useProductDetail(productId);
  const product = response?.data;

  if (isError) {
    if (error.response?.status === 404) {
      return <NotFoundPage />;
    }
    throw new Error();
  }

  return (
    <>
      {isPending ? (
        <CircularLoading />
      ) : (
        <div className="w-full flex flex-col items-center">
          <VariantSelectionProvider>
            <ProductDetailData product={product} />
          </VariantSelectionProvider>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
