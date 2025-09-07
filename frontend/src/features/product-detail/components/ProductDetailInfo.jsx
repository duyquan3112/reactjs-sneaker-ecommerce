import React from "react";
import FormatUtil from "../../../utils/FormatUtil.js";

const ProductDetailInfo = ({ product }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <p className="text-sm space-x-2">
        <span className="text-black font-semibold">
          {FormatUtil.formatPrice(product.price)}
        </span>
        <span className="text-xs italic line-through text-gray-400">
          {FormatUtil.formatPrice(product.comparePrice)}
        </span>
      </p>
    </div>
  );
};

export default ProductDetailInfo;
