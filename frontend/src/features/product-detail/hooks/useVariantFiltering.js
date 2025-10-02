import { useMemo } from "react";
import { useVariantSelectionContext } from "../contexts";

export const useVariantFiltering = (variants) => {
  const { selectedVariants } = useVariantSelectionContext();

  const availableOptions = useMemo(() => {
    if (!variants || !Array.isArray(variants)) {
      return {
        isSizeAvailable: () => false,
        isColorAvailable: () => false,
      };
    }

    // Get variants in stock
    const availableVariants = variants.filter(
      (variant) => variant.stock > 0 || variant.stock === undefined
    );

    // All available sizes and colors
    const allAvailableSizes = [
      ...new Set(availableVariants.map((v) => v.attributes.size)),
    ];
    const allAvailableColors = [
      ...new Set(availableVariants.map((v) => v.attributes.color)),
    ];

    // Check if a size is selectable
    const isSizeAvailable = (size) => {
      // No color selected, get any size that exists
      if (!selectedVariants.color) {
        return allAvailableSizes.includes(size);
      }

      // Color selected, size must exist with that color
      return availableVariants.some(
        (v) =>
          v.attributes.size === size &&
          v.attributes.color === selectedVariants.color
      );
    };

    // Check if a color is selectable
    const isColorAvailable = (color) => {
      // No size selected, get any color that exists
      if (!selectedVariants.size) {
        return allAvailableColors.includes(color);
      }

      // Size selected, color must exist with that size
      return availableVariants.some(
        (v) =>
          v.attributes.color === color &&
          v.attributes.size === selectedVariants.size
      );
    };

    return {
      isSizeAvailable,
      isColorAvailable,
    };
  }, [variants, selectedVariants]);

  return availableOptions;
};
