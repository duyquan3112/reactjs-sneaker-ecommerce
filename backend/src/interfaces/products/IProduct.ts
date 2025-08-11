import { IBaseModel } from "../common/IBaseModel";

export interface IProduct  extends IBaseModel{
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
}