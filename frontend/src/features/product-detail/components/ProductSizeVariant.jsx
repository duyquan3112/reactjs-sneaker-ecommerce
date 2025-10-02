import React from "react";
import { useVariantSelectionContext } from "../contexts";

const ProductSizeVariant = ({ sizes, isSizeAvailable }) => {
  const { selectedVariants, selectVariant } = useVariantSelectionContext();

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => {
        const isSelected = selectedVariants["size"] === size;
        const isAvailable = isSizeAvailable(size);
        const isDisabled = isSelected || !isAvailable;

        return (
          <button
            disabled={isDisabled}
            className={`${
              isSelected
                ? "bg-topbar-black text-white"
                : isAvailable
                ? "bg-white text-topbar-black hover:text-topbar-black/60 hover:border-topbar-black/60"
                : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
            } flex justify-center items-center border px-2 py-1 rounded-md transition-all duration-200 w-8 h-8`}
            key={size}
            onClick={() => isAvailable && selectVariant("size", size)}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default ProductSizeVariant;
