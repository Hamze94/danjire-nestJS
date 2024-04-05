import { IsNotEmpty, IsEmail, IsString, isNumber } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    address?: Number;

    @IsNotEmpty()
    phoneNumber?: number;

    @IsString()
    role?: string;

    @IsString()
    description?: string;
}
