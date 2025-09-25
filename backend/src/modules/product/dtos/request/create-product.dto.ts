import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  IsOptional,
  Min,
  ValidateNested,
  IsNotEmpty,
  IsEnum
} from "class-validator";
import { StatusTypes } from "../../interfaces/product.interface";

export interface ICreateProductDTO {
  name: string;
  brand: string;
  basePrice: number;
  baseComparePrice: number;
  images: string[];
  categories: string[];
  variants: ICreateProductVariantDTO[];
  shortDescription?: string;
  fullDescription?: string;
  tags?: string[];
  status: StatusTypes;
}

export interface ICreateProductVariantDTO {
  attributes: Record<string, string | number>;
  price: number;
  comparePrice?: number;
  stock: number;
  weight?: number;
  images?: string[];
}

export class CreateProductDTO implements ICreateProductDTO {
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  brand: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  basePrice: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  baseComparePrice: number;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  @IsNotEmpty()
  images: string[];

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  @IsNotEmpty()
  categories: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDTO)
  @IsNotEmpty()
  variants: ICreateProductVariantDTO[];

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  fullDescription?: string;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  @IsOptional()
  tags?: string[];

  @IsEnum(StatusTypes)
  @IsOptional()
  status: StatusTypes = StatusTypes.DRAFT;
}

export class CreateProductVariantDTO implements ICreateProductVariantDTO {
  @IsObject()
  attributes: Record<string, string | number>;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  comparePrice?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  weight?: number;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  @IsOptional()
  images?: string[];
}
