import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    userId: string;


    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    balance: number;
}
