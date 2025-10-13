import { Expose, Transform, Type } from "class-transformer";
import { StatusTypes } from "../../interfaces/product.interface";

export class ProductVariantResponseDTO {
  @Expose()
  sku: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  available?: boolean;

  @Expose()
  images?: string[];

  @Expose()
  attributes: Record<string, string | number>;

  @Expose()
  weight?: number;
}

export class ProductResponseDTO {
  @Expose()
  @Transform(({ obj }) => obj._id)
  id: string;

  @Expose()
  slug: string;

  @Expose()
  name: string;

  @Expose()
  brand: string;

  @Expose()
  basePrice: number;

  @Expose()
  baseComparePrice?: number;

  @Expose()
  @Transform(({ obj }) => obj.images[0] ?? null)
  image: string;

  @Expose()
  @Transform(({ value }) => value ?? [])
  images: string[];

  @Expose()
  categories: string[];

  @Expose()
  attributesTemplate: Record<string, (string | number)[]>;

  @Expose()
  @Type(() => ProductVariantResponseDTO)
  variants: ProductVariantResponseDTO[];

  @Expose()
  shortDescription?: string;

  @Expose()
  fullDescription?: string;

  @Expose()
  tags?: string[];

  @Expose()
  status: StatusTypes;
}
