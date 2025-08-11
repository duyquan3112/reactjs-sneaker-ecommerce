import { ObjectId } from "mongodb";
import { IBaseModel } from "../../interfaces/common/IBaseModel";

export abstract class BaseModel implements IBaseModel {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: Partial<IBaseModel>){
        this.id = data.id || ObjectId.generate().toString();
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}