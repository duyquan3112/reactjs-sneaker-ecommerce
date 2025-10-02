import {
  BaseVariant,
  ProductSizeVariant,
  ProductColorVariant,
} from "./index.js";
import { useVariantFiltering } from "../hooks/useVariantFiltering.js";

const ProductVariantSelect = ({ variantTemplate, variants }) => {
  if (!variantTemplate) {
    return;
  }

  const { isSizeAvailable, isColorAvailable } = useVariantFiltering(variants);

  return (
    <div className="flex flex-col gap-3 w-full">
      {variantTemplate.size && (
        <BaseVariant title="Size">
          <ProductSizeVariant
            sizes={variantTemplate.size}
            isSizeAvailable={isSizeAvailable}
          />
        </BaseVariant>
      )}
      {variantTemplate.color && (
        <BaseVariant title="Color">
          <ProductColorVariant
            colors={variantTemplate.color}
            isColorAvailable={isColorAvailable}
          />
        </BaseVariant>
      )}
    </div>
  );
};

export default ProductVariantSelect;
