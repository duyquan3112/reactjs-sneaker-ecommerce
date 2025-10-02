import React from "react";

import {
  ProductAction,
  ProductAdditionData,
  ProductDetailImagePreview,
  ProductDetailInfo,
  ProductVariantSelect,
} from "./index.js";

import { LineDivider } from "../../../components/index.js";
import { useVariantSelectionContext } from "../contexts/useVariantSelectionContext.js";
import AppLogger from "../../../utils/AppLogger.js";

const ProductDetailData = ({ product }) => {
  const images = product.images || [];
  const { selectedVariants } = useVariantSelectionContext();
  const productVariants = Array.from(product.variants);

  const productSkusBySelectedVariants = productVariants
    .filter(
      (variant) =>
        variant.attributes.color === selectedVariants.color &&
        variant.attributes.size === selectedVariants.size
    )
    .map((variant) => variant.sku);

  AppLogger.info(productSkusBySelectedVariants);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 px-4 py-2 bg-white lg:px-24 lg:py-8">
      <ProductDetailImagePreview images={images} />
      <div className="flex-1 flex flex-col gap-4">
        <ProductDetailInfo product={product} />
        <ProductVariantSelect
          variantTemplate={product.attributesTemplate}
          variants={productVariants}
        />
        <ProductAction
          onAddToCart={() => {}}
          onBuyNow={() => {}}
          quantityCallback={() => {}}
        />
        <LineDivider className="md:my-3" />
        <ProductAdditionData
          skus={productSkusBySelectedVariants}
          categories={product.categories}
          tags={product.tags}
        />
      </div>
    </div>
  );
};

export default React.memo(ProductDetailData);
