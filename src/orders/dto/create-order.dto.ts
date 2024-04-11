// create-order.dto.ts
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsNotEmpty()
    products: string[];
}
