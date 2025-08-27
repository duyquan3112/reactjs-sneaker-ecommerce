export interface IUpdateProductVariantDTO {
  attributes: Record<string, string | number>;
  price: number;
  comparePrice?: number;
  stock: number;
  weight?: number;
  images?: string[];
  available?: boolean;
}

export interface IUpdateProductDTO {
  name?: string;
  brand?: string;
  basePrice?: number;
  images?: string[];
  categories?: string[];
  variants?: IUpdateProductVariantDTO[];
  shortDescription?: string;
  fullDescription?: string;
  tags?: string[];
  status?: StatusTypes;
}

import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsArray,
  IsObject,
  IsBoolean,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { StatusTypes } from "../../interfaces/product.interface";

export class UpdateProductVariantDTO implements IUpdateProductVariantDTO {
  @IsObject()
  attributes: Record<string, string | number>;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  comparePrice?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}

export class UpdateProductDTO implements IUpdateProductDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  brand?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  basePrice?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  categories?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDTO)
  variants?: IUpdateProductVariantDTO[];

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  fullDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  tags?: string[];

  @IsOptional()
  @IsEnum(StatusTypes)
  status?: StatusTypes;
}
