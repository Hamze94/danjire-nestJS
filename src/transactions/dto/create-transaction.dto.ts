import { IsNotEmpty, IsNumber, IsDate, IsString } from 'class-validator';
import { Card } from 'src/cards/entities/card.entity';
import { Order } from 'src/schemas/order.schema';


export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    amount: string;

    @IsNotEmpty()
    cardId: Card;

    orderId: Order;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsString()
    type: string;
}
