import React from "react";
import ImagePreview from "./ImagePreview.jsx";
import ProductInfo from "./ProductInfo.jsx";

const ProductData = ({ product, images }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-11 px-4 py-2 bg-white lg:px-24 lg:py-8">
      <ImagePreview images={images} />
      <div className="flex-1">
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductData;
