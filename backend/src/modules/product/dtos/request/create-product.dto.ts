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
  IsEnum,
} from "class-validator";
import { StatusTypes } from "../../interfaces/product.interface";
export class CreateProductDTO {
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
  variants: CreateProductVariantDTO[];

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

export class CreateProductVariantDTO {
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
