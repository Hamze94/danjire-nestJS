import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      }
    ])
  ]
})
export class CategoriesModule { }
