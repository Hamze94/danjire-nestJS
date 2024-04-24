import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Card } from 'src/cards/entities/card.entity';
import { CardsService } from 'src/cards/cards.service';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly cardsService: CardsService, // Inject CardsService
        private jwtService: JwtService,

    ) { }
    getUserByEmail(email: string) {
        const existingUser = this.userModel.findOne({ email: email });
        return existingUser
    }
    async getUserByEmailAndPassword(email: string, password: string) {
        const user = this.getUserByEmail(email)
    }
    async createUser(userData: CreateUserDto) {
        const existingUser = await this.getUserByEmail(userData.email);
        if (!existingUser) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Create a new user instance with hashed password
            const newUser = new this.userModel({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                address: userData.address,
                phoneNumber: userData.phoneNumber,
                description: userData.description

            });

            // Save the user to the database
            const savedUser = await newUser.save();

            // Create a card for the new user
            const createCardDto: CreateCardDto = {
                userId: savedUser._id.toString(), // Convert ObjectId to string
                balance: 0
            };
            await this.cardsService.create(createCardDto);

            return savedUser;
        } else {
            throw new BadRequestException('User already exists');
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email: email });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        console.log(user)
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const payload = { user };
        return { access_token: this.jwtService.sign(payload, { secret: 'your_secret_key' }) };
    }

}
