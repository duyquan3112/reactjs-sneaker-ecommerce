import React from "react";
import {
  BaseVariant,
  ProductSizeVariant,
  ProductColorVariant
} from "./index.js";

const ProductVariantSelect = ({ variantTemplate }) => {
  if (!variantTemplate) {
    return;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {variantTemplate.size && (
        <BaseVariant title="Size">
          <ProductSizeVariant sizes={variantTemplate.size} />
        </BaseVariant>
      )}
      {variantTemplate.color && (
        <BaseVariant title="Color">
          <ProductColorVariant colors={variantTemplate.color} />
        </BaseVariant>
      )}
    </div>
  );
};

export default ProductVariantSelect;
