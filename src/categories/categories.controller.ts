import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }

  @Get('/')
  async fetchAllCategoreis() {
    return this.categoryService.findAll();
  }
  @Post('create')
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.create(categoryData)
  }
  @Get('/:id')
  async fetchCatgory(@Param('id') id) {
    return this.categoryService.findOne(id)
  }
  @Put('/:id/update')
  async updateCategory(@Param('id') id, @Body() updatedCategoryData: UpdateCategoryDto) {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryService.update(id, updatedCategoryData);
  }
  @Delete('/:id/delete')
  async deleteCategory(@Param('id') id) {
    return await this.categoryService.delete(id)
  }

}
