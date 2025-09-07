import React from "react";
import ProductDetailImagePreview from "./ProductDetailImagePreview.jsx";
import ProductDetailInfo from "./ProductDetailInfo.jsx";

const ProductDetailData = ({ product, images }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-11 px-4 py-2 bg-white lg:px-24 lg:py-8">
      <ProductDetailImagePreview images={images} />
      <div className="flex-1">
        <ProductDetailInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetailData;
