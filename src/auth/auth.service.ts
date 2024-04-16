import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private jwtService: JwtService,
    ) { }
    getUserByEmail(email: string) {
        const existingUser = this.userModel.findOne({ email: email });
        return existingUser
    }
    async getUserByEmailAndPassword(email: string, password: string) {
        const user = this.getUserByEmail(email)
    }
    async createUser(name: string, email: string, password: string) {
        const exsitingUser = await this.getUserByEmail(email);
        if (!exsitingUser) {
            //Hash the password and asve the user in the databse
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = { name, email, password: hashPassword }
            const user = this.userModel.create(newUser);
            return user
        } else {
            throw new BadRequestException('User Exsit');
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
