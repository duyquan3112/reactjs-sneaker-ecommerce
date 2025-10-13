import {
  ErrorCode,
  HttpStatusCode
} from "../../../constants/http-status-code.constant";
import { AppError } from "../../../utils/app-error.util";
import { AppLogger } from "../../../utils/app-logger.util";
import {
  CreateProductDTO,
  CreateProductVariantDTO
} from "../dtos/request/create-product.dto";
import {
  UpdateProductVariantDTO,
  UpdateProductDTO
} from "../dtos/request/update-product.dto";
import { ProductVariant } from "../interfaces/product-variant.interface";
import { Product } from "../interfaces/product.interface";
import sanitizeHtml from "sanitize-html";

/**
 * Generate attribute template from variants
 * Example: [{ color: "red", size: 42 }, { color: "red", size: 43 }] -> { color: ["red"], size: [42, 43] }
 * @param variants - Product variants
 * @returns Attribute template
 */
export const genAttributeTemplateFromVariant = (
  variants:
    | ProductVariant[]
    | CreateProductVariantDTO[]
    | UpdateProductVariantDTO[]
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

const validateId = (id: string): void => {
  if (!id || id.trim() === "") {
    AppLogger.error(`Invalid ID provided: ${id}`);
    throw new AppError(
      HttpStatusCode.NOT_FOUND,
      ErrorCode.NOT_FOUND,
      "Product not found"
    );
  }

  // Check if ID is a valid MongoDB ObjectId (24 hex characters)
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(id)) {
    AppLogger.error(`Invalid ID provided: ${id}`);
    throw new AppError(
      HttpStatusCode.NOT_FOUND,
      ErrorCode.NOT_FOUND,
      "Product not found"
    );
  }
};

const buildProductFromDTO = (data: CreateProductDTO): Product => {
  const attributesTemplate = data.variants
    ? ProductHelper.genAttributeTemplateFromVariant(data.variants)
    : {};

  const slug = ProductHelper.generateSlug(data.name);
  const fullDescription = data.fullDescription
    ? sanitizeHtml(data.fullDescription, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"])
      })
    : "";

  return new Product({
    ...data,
    attributesTemplate,
    fullDescription,
    slug,
    variants: data.variants.map(
      (variant) =>
        new ProductVariant({
          ...variant,
          sku: ProductHelper.generateSKU(
            data.brand ?? "",
            slug,
            variant.attributes
          )
        })
    )
  });
};

const buildUpdatedProductData = (
  currentProduct: Product,
  updateData: UpdateProductDTO
): Product => {
  const attributesTemplate = updateData.variants
    ? ProductHelper.genAttributeTemplateFromVariant(updateData.variants)
    : currentProduct.attributesTemplate;

  const slug = ProductHelper.generateSlug(
    updateData.name ?? currentProduct.name
  );
  const fullDescription = updateData.fullDescription
    ? sanitizeHtml(updateData.fullDescription, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"])
      })
    : currentProduct.fullDescription;

  return currentProduct.copyWith({
    ...updateData,
    attributesTemplate,
    fullDescription,
    slug,
    variants: updateData.variants?.map(
      (variant) =>
        new ProductVariant({
          ...variant,
          sku: ProductHelper.generateSKU(
            updateData.brand ?? currentProduct.brand ?? "",
            slug,
            variant.attributes
          )
        })
    )
  });
};

export const ProductHelper = {
  genAttributeTemplateFromVariant,
  generateSKU,
  generateSlug,
  validateId,
  buildProductFromDTO,
  buildUpdatedProductData
};
