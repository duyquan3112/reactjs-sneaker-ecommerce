import { Document } from "mongoose";

export interface IBaseRepository <T extends Document> {
    // CRUD
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}