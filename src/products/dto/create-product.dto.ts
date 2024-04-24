// create-product.dto.ts
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsNotEmpty()
    @IsNumber()
    costPrice: number;

    @IsNotEmpty()
    @IsNumber()
    sellingPrice: number;

    @IsNotEmpty()
    @IsNumber()

    quantity: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsDate()
    expireyDate: Date;

    @IsString()
    imageUrl: string
}
