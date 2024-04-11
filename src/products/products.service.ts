// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import { Product } from './entities/product.entites';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) { }
    async create(createProductDto: CreateProductDto, image: Buffer) {
        try {
            const uploadStream = cloudinary.v2.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                if (error) {
                    throw new Error('Failed to upload image to Cloudinary');
                }
                const product = new this.productModel({
                    ...createProductDto,
                    imageUrl: result.secure_url
                });
                const productsaved = product.save();
                return productsaved
            });

            uploadStream.end(image);

        } catch (error) {
            throw new Error('Failed to create product');
        }

    }


    async findAll() {
        try {
            return await this.productModel.find().exec();
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            return await this.productModel.findById(id).exec();
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
        } catch (error) {
            throw error;
        }
    }

    async remove(id: string) {
        try {
            return await this.productModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw error;
        }
    }
    async getProductsLowOnStock(threshold: number): Promise<Product[]> {
        try {
            return await this.productModel.find({ quantity: { $lte: threshold } }).exec();
        } catch (error) {
            throw new Error(`Failed to get products low on stock: ${error.message}`);
        }
    }

    async getProductsNearExpirationDate(daysLeft: number): Promise<Product[]> {
        try {
            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setDate(expirationDate.getDate() + daysLeft);
            return await this.productModel.find({ expireyDate: { $lte: expirationDate } }).exec();
        } catch (error) {
            throw new Error(`Failed to get products near expiration date: ${error.message}`);
        }
    }

    async getProductsByCategory(categoryId: string): Promise<Product[]> {
        try {
            return await this.productModel.find({ categoryId: categoryId }).exec();
        } catch (error) {
            throw new Error(`Failed to get products by category: ${error.message}`);
        }
    }
}
