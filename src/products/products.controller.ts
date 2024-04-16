// products.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@Body() productData: CreateProductDto, @UploadedFile() image: Express.Multer.File) {
    return await this.productsService.create(productData, image.buffer);
  }

  @Get('low-stock')
  async getProductsLowOnStock() {
    return await this.productsService.getProductsLowOnStock(10);
  }

  @Get('near-expiration')
  async getProductsNearExpiration() {
    return await this.productsService.getProductsNearExpirationDate(30);
  }
  @Get()
  async getAllProducts() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      // Handle specific errors if needed
      throw error;
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      // Handle specific errors if needed
      throw error;
    }
  }

  @Put(':id/update')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFile() image: Express.Multer.File) {
    try {
      return await this.productsService.update(id, updateProductDto, image?.buffer);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id/delete')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('category/:categoryId')
  async getProductsByCategory(@Param('categoryId') categoryId: string) {
    return await this.productsService.getProductsByCategory(categoryId);
  }
}
