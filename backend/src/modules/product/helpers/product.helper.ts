import {
  ErrorCode,
  HttpStatusCode,
} from "../../../constants/http-status-code.constant";
import { AppError } from "../../../utils/app-error.util";
import { AppLogger } from "../../../utils/app-logger.util";
import {
  ICreateProductDTO,
  ICreateProductVariantDTO,
} from "../dtos/request/create-product.dto";
import { IUpdateProductVariantDTO } from "../dtos/request/update-product.dto";
import { IProductVariant } from "../interfaces/product-variant.interface";

/**
 * Generate attribute template from variants
 * Example: [{ color: "red", size: 42 }, { color: "red", size: 43 }] -> { color: ["red"], size: [42, 43] }
 * @param variants - Product variants
 * @returns Attribute template
 */
export const genAttributeTemplateFromVariant = (
  variants:
    | IProductVariant[]
    | ICreateProductVariantDTO[]
    | IUpdateProductVariantDTO[]
): Record<string, (string | number)[]> => {
  const attributesTemplate: Record<string, (string | number)[]> = {};
  if (variants) {
    variants.forEach((variant) => {
      AppLogger.info(
        `Generating attribute template from variant: ${JSON.stringify(variant)}`
      );
      AppLogger.info(`Attributes: ${JSON.stringify(variant.attributes)}`);
      AppLogger.info(
        `Attributes entries: ${JSON.stringify(Object.entries(variant.attributes))}`
      );
      Object.entries(variant.attributes).forEach(([key, value]) => {
        if (!attributesTemplate[key]) {
          attributesTemplate[key] = [];
        }
        if (!attributesTemplate[key].includes(value)) {
          attributesTemplate[key].push(value);
        }
      });
    });
  }

  return attributesTemplate;
};

/**
 * Generate SKU with auto-increment suffix.
 * Example: NIKE-AM1-RED-42, NIKE-PANDA-BLUE-42
 *
 * @param brand - Brand name (e.g., "Nike")
 * @param slug - Product slug (e.g., "air-max-1")
 * @param attributes - Variant attributes (must include color and size)
 * @returns Unique SKU string
 */
export const generateSKU = (
  brand: string,
  slug: string,
  attributes: Record<string, string | number>
): string => {
  const brandCode = brand.toUpperCase();
  const slugSplit = slug.split(/-/g);
  const slugCode =
    slugSplit.length === 1
      ? slugSplit[0].toUpperCase()
      : slugSplit
          .map((char) =>
            isNaN(+char) ? char[0].toUpperCase() : char.toUpperCase()
          )
          .join("");
  slugSplit;
  const colorCode = String(attributes.color).replace(/\s+/g, "").toUpperCase();
  const sizeCode = String(attributes.size).toUpperCase();

  const baseSKU = `${brandCode}-${slugCode}-${colorCode}-${sizeCode}`;

  return baseSKU;
};

// Generate slug from name
/**
 * Generate slug from name
 * Example: "Nike Air Max 1" -> "nike-air-max-1"
 * @param name - Product name
 * @returns Slug string
 */

export const generateSlug = (name: string): string => {
  if (name.trim() === "") {
    throw new AppError(
      HttpStatusCode.BAD_REQUEST,
      ErrorCode.BAD_REQUEST,
      "Name is required to generate slug"
    );
  }

  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export const ProductHelper = {
  genAttributeTemplateFromVariant,
  generateSKU,
  generateSlug,
};
