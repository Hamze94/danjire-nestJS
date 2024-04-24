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
interface CloudinaryUploadResult {
    secure_url: string;
    // Add other properties if needed
}
@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) { }
    async create(createProductDto: CreateProductDto, image: Buffer): Promise<Product> {
        try {
            // Create a Promise to wait for the image upload to complete
            const imageUploadPromise = new Promise((resolve, reject) => {
                // Create a readable stream from the image Buffer
                const imageStream = cloudinary.v2.uploader.upload_stream({ folder: 'products' }, async (error: any, result: CloudinaryUploadResult) => {
                    if (error) {
                        console.error('Failed to upload image to Cloudinary:', error);
                        reject(new Error('Failed to upload image to Cloudinary'));
                    } else {
                        // Resolve the Promise with the uploaded image URL
                        resolve(result.secure_url);
                    }
                });

                // Write the image data to the upload stream
                imageStream.end(image);
            });

            // Wait for the image upload Promise to resolve
            const imageUrl = await imageUploadPromise;

            // Create the product with the uploaded image URL
            const product = new this.productModel({
                ...createProductDto,
                imageUrl: imageUrl
            });

            // Save the product to the database
            const savedProduct = await product.save();
            // Return the saved product with the image URL
            return savedProduct;
        } catch (error) {
            console.error('Error creating product:', error);
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
    async update(id: string, updateProductDto: UpdateProductDto, image: Buffer) {
        try {
            let productData: {
                name?: string;
                costPrice?: number;
                sellingPrice?: number;
                quantity?: number;
                description?: string;
                image?: string;
                expireyDate?: Date;
                imageUrl?: string;
            } = { ...updateProductDto };

            if (image) {
                // Create a promise to handle the Cloudinary upload
                const uploadResult: Promise<string> = new Promise((resolve, reject) => {
                    cloudinary.v2.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                        if (error) {
                            reject(new Error('Failed to upload image to Cloudinary'));
                        } else {
                            resolve(result.secure_url);
                        }
                    }).end(image);
                });
                // Wait for the upload to complete and update the imageUrl
                productData.imageUrl = await uploadResult;
            }
            // Update the product data in the database
            return await this.productModel.findByIdAndUpdate(id, productData, { new: true }).exec();
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
