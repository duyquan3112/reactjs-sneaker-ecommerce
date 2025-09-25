import { IProductVariant, ProductVariant } from "./product-variant.interface";

export enum StatusTypes {
  ACTIVE = "ACTIVE",
  OUT_OF_STOCK = "OUT-OF-STOCK",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED"
}

export interface IProduct {
  name: string;
  slug: string;
  brand: string;
  basePrice: number;
  baseComparePrice: number;
  shortDescription?: string;
  fullDescription?: string;
  images: string[];
  categories: string[];
  variants: IProductVariant[];
  attributesTemplate: Record<string, (string | number)[]>;
  tags?: string[];
  status: StatusTypes;
}

export class Product implements IProduct {
  name: string;
  slug: string;
  brand: string;
  basePrice: number;
  baseComparePrice: number;
  shortDescription?: string;
  fullDescription?: string;
  images: string[];
  categories: string[];
  variants: ProductVariant[];
  attributesTemplate: Record<string, (string | number)[]>;
  tags?: string[] | undefined;
  status: StatusTypes;

  constructor(data: IProduct) {
    this.name = data.name;
    this.slug = data.slug;
    this.brand = data.brand;
    this.basePrice = data.basePrice;
    this.baseComparePrice = data.baseComparePrice;
    this.shortDescription = data.shortDescription;
    this.fullDescription = data.fullDescription;
    this.images = data.images;
    this.categories = data.categories;
    this.variants = data.variants;
    this.attributesTemplate = data.attributesTemplate;
    this.tags = data.tags;
    this.status = data.status;
  }

  copyWith(data: Partial<IProduct>): Product {
    return new Product({
      ...this,
      ...data
    });
  }
}
