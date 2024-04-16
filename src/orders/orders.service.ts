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
    return await this.orderModel.create(orderData);

  }

  async getOrdersByUserId(user: string): Promise<Order[]> {
    return await this.orderModel.findOne({ user });
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
      console.log(order.products)
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
