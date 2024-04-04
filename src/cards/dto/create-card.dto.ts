import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    balance: number;
}
