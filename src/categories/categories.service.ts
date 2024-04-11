import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) { }
  async create(category: CreateCategoryDto) {
    return await this.categoryModel.create(category)
  }
  async findAll() {
    return await this.categoryModel.find(({}));
  }
  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id)
      return category
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Wrong id was passed');
    }

  }
  async update(id: string, category) {
    return await this.categoryModel.findByIdAndUpdate(id, category, { new: true })
  }
  async delete(id) {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
