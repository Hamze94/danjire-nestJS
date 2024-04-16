import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/JwtAuthGuard ';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, JwtService],
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        JwtModule.register({
            secret: 'your_secret_key', // Replace with a strong, unique secret key
        }),

        JwtModule],
    exports: [AuthGuard, JwtService]

})
export class AuthModule { }
