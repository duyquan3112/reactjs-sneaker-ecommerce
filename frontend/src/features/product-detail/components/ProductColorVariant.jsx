import React from "react";
import { useVariantSelectionContext } from "../contexts";

const ProductColorVariant = ({ colors, isColorAvailable }) => {
  const { selectedVariants, selectVariant } = useVariantSelectionContext();

  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => {
        const isSelected = selectedVariants["color"] === color;
        const isAvailable = isColorAvailable(color);
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
            } flex justify-center items-center border px-2 py-1 rounded-md transition-all duration-200 h-8`}
            key={color}
            onClick={() => isAvailable && selectVariant("color", color)}
            title={!isAvailable ? "Màu này không có hàng" : ""}
          >
            {color}
          </button>
        );
      })}
    </div>
  );
};

export default ProductColorVariant;
