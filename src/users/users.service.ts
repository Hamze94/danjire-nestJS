import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
  async createUser(username: string, password: string): Promise<User> {
    return this.userModel.create({
      username,
      password,
    });
  }
  async findAll() {
    return this.userModel.find({});
  }
  async upate(id: string, userData) {
    return await this.userModel.findByIdAndUpdate({ "_id": id }, userData)
  }
}
