export interface IProductVariant {
  sku: string;
  attributes: Record<string, string | number>;
  price: number;
  comparePrice?: number;
  stock: number;
  weight?: number;
  images?: string[];
  available?: boolean;
}

export class ProductVariant implements IProductVariant {
  sku: string;
  attributes: Record<string, string | number>;
  price: number;
  comparePrice?: number;
  stock: number;
  weight?: number;
  images?: string[];
  available?: boolean;

  constructor(data: IProductVariant) {
    this.sku = data.sku;
    this.attributes = data.attributes;
    this.price = data.price;
    this.comparePrice = data.comparePrice;
    this.stock = data.stock;
    this.weight = data.weight;
    this.images = data.images;
    this.available = data.available;
  }
}
