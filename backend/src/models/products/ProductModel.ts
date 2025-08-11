import { IProduct } from "../../interfaces/products/IProduct";
import { BaseModel } from "../common/BaseModel";

export class ProductModel extends BaseModel implements IProduct {
    name: string;
    price: number;
    comparePrice: number;
    shortDescription: string;
    fullDescription: string;
    image: string;
    category: string;
    sizes: string[];
    colors: string[];
    isNew: boolean;
    stockQuantity: number;
    isActive: boolean;
    constructor(data: Partial<IProduct>) {
        super(data);
        this.name = data.name || "";
        this.price = data.price || 0;
        this.comparePrice = data.comparePrice || 0;
        this.shortDescription = data.shortDescription || "";
        this.fullDescription = data.fullDescription || "";
        this.image = data.image || "";
        this.category = data.category || "";
        this.sizes = data.sizes || [];
        this.colors = data.colors || [];
        this.isNew = data.isNew || false;
        this.stockQuantity = data.stockQuantity || 0;
        this.isActive = data.isActive || true;
    }

    // Business logic

    validate(): boolean {

        if (!this.name.trim()) {
            throw new Error("Product name is required");
        }

        if (this.price <= 0) {
            throw new Error("Product price must be greater than 0");
        }

        if (this.comparePrice <= 0) {
            throw new Error("Product compare price must be greater than 0");
        }

        if (this.price > this.comparePrice) {
            throw new Error("Product price must be less than compare price");
        }

        return true;
    }

    isAvailable(): boolean {
        return this.isActive && this.isInStock();
    }

    isInStock(): boolean {
        return this.stockQuantity > 0;
    }

    isOutOfStock(): boolean {
        return !this.isInStock();
    }

    hasDiscount(): boolean {
        return this.price < this.comparePrice;
    }

    // JSON

    toJSON(): IProduct {
        return {
            ...this,
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromJSON(json: IProduct): ProductModel {
        return new ProductModel({
            ...json,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
        });
    }
}