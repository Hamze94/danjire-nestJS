import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  @Get('/')
  async fetchAllOrders() {
    return await this.ordersService.getAllOrders()
  }
  constructor(private ordersService: OrdersService) { }
  @Post('/create')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':userId')
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.getOrdersByUserId(userId);
  }
  @Get('/revenue/month')
  async getRevenueForCurrentMonth(): Promise<number> {
    return this.ordersService.getRevenueForCurrentMonth();
  }


}
