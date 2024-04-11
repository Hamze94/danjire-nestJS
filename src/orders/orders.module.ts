import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { Product, ProductSchema } from 'src/products/entities/product.entites';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      },
    ]),
  ]
})
export class OrdersModule { }
