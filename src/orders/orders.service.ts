import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entites';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,

  ) { }
  async create(orderData: CreateOrderDto): Promise<Order> {
    try {
      // Create the order
      const order = await this.orderModel.create(orderData);

      // Iterate over each product in the order
      for (const productData of orderData.products) {
        const productId = productData._id;
        const quantity = productData.quantity;

        // Find the product in the database
        const product = await this.productModel.findById(productId);

        if (product) {
          // Subtract the quantity from the product
          product.quantity -= quantity;
          // Save the updated product
          await product.save();
        }
      }

      return order;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create order');
    }
  }


  async getOrdersByUserId(user: string): Promise<Order[]> {
    try {
      const userOrders = await this.orderModel.find({ "user._id": user });
      return userOrders;
    } catch (error) {
      console.log(error);
      throw error; // Throw the error to handle it at the higher level if necessary
    }

  }
  async getAllOrders() {
    return await this.orderModel.find({});
  }
  async getRevenueForCurrentMonth(): Promise<number> {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const orders = await this.orderModel.find({
      orderDate: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    }).exec();


    let totalRevenue = 0;
    for (const order of orders) {
      for (const productId of order.products) {
        const product: Product = await this.productModel.findById(productId).exec(); // Fetch product details
        if (product) {
          totalRevenue += product.sellingPrice - product.costPrice;
        }
      }
    }
    console.log(totalRevenue)
    return totalRevenue;
  }
}
