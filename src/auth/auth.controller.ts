import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Get("users")
    getAllUsers() {
        return 'hi'
    }

    @Post('singup')
    async singup(@Body() userData: CreateUserDto) {
        try {
            const newUser = await this.authService.createUser(userData);
            return newUser;
        } catch (error) {
            return { error: error.message };
        }
    }
    @Post('login')
    async login(@Body() body: { email: string; password: string }): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }
}
