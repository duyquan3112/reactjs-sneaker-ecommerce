import React from "react";
import { useVariantSelectionContext } from "../contexts";

const ProductSizeVariant = ({ sizes }) => {
  const { selectedVariants, selectVariant } = useVariantSelectionContext();
  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => {
        const isSelected = selectedVariants["size"] === size;
        return (
          <button
            disabled={isSelected}
            className={`${
              isSelected
                ? "bg-topbar-black text-white"
                : "bg-white  text-topbar-black hover:text-topbar-black/60 hover:border-topbar-black/60"
            } flex justify-center items-center border border-topbar-black px-2 py-1 rounded-md transition-all duration-200 w-8 h-8`}
            key={size}
            onClick={() => selectVariant("size", size)}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default ProductSizeVariant;
