import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductData {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductData)
    products: ProductData[];
}
