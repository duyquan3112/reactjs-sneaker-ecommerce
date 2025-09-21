import { useSearchParams } from "react-router-dom";
import { NotFoundPage, CircularLoading } from "../../../components";
import MockupData from "../../../utils/MockupData.js";
import {
  Suspense,
  lazy,
  use,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import useProductDetail from "../hooks/useProductDetail";

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
    error,
  } = useProductDetail(productId);
  const product = response?.data;

  const images = MockupData.imagePreviewData;

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
          <ProductDetailData product={product} images={images} />
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
