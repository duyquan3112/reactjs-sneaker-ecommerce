import React from "react";
import { useVariantSelectionContext } from "../contexts";

const ProductColorVariant = ({ colors }) => {
  const { selectedVariants, selectVariant } = useVariantSelectionContext();
  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => {
        const isSelected = selectedVariants["color"] === color;
        return (
          <button
            disabled={isSelected}
            className={`${
              isSelected
                ? "bg-topbar-black text-white"
                : "bg-white  text-topbar-black hover:text-topbar-black/60 hover:border-topbar-black/60"
            } flex justify-center items-center border border-topbar-black px-2 py-1 rounded-md transition-all duration-200 h-8`}
            key={color}
            onClick={() => selectVariant("color", color)}
          >
            {color}
          </button>
        );
      })}
    </div>
  );
};

export default ProductColorVariant;
