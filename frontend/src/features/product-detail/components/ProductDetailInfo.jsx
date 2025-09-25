import React from "react";
import FormatUtil from "../../../utils/FormatUtil.js";

const ProductDetailInfo = ({ product }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-bold">{product.name}</h2>
      <p className="text-sm space-x-2">
        <span className="text-gray-700 text-2xl font-medium">
          {FormatUtil.formatPrice(product.basePrice)}
        </span>
        {product.comparePrice && (
          <span className="text-xs italic line-through text-gray-400">
            {FormatUtil.formatPrice(product.comparePrice)}
          </span>
        )}
      </p>
      <p className="font-normal text-sm text-black">
        {product.shortDescription}
      </p>
    </div>
  );
};

export default React.memo(ProductDetailInfo);
