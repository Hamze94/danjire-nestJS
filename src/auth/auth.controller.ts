import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Get("user")
    getAllUsers() {
        return 'hi'
    }

    @Post('singup')
    async singup(@Body() body: { name: string, email: string, password: string }) {
        try {
            const newUser = await this.authService.createUser(body.name, body.email, body.password);
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
