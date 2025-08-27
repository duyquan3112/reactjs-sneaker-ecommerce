import { Expose, Transform, Type } from "class-transformer";
import { StatusTypes } from "../../interfaces/product.interface";

export interface IProductVariantResponseDTO {
  sku: string;
  price: number;
  stock: number;
  available?: boolean;
  images?: string[];
  attributes: Record<string, string | number>;
  weight?: number;
}

export interface IProductResponseDTO {
  id: string;
  slug: string;
  name: string;
  brand: string;
  basePrice: number;
  images: string[];
  categories: string[];
  attributesTemplate: Record<string, (string | number)[]>;
  variants: IProductVariantResponseDTO[];
  shortDescription?: string;
  fullDescription?: string;
  tags?: string[];
  status: StatusTypes;
}

export class ProductVariantResponseDTO implements IProductVariantResponseDTO {
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

export class ProductResponseDTO implements IProductResponseDTO {
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
