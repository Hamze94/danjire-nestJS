import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) { }
  @Post('create')
  async createTransaction(@Body() transactionData: CreateTransactionDto) {
    return this.transactionsService.create(transactionData);
  }
  @Get('user/:userId')
  async getUserTransactions(@Param('userId') userId: string) {
    return await this.transactionsService.findUserTransactions(userId);
  }
  @Get()
  async getAllTransactios() {
    return this.transactionsService.findAll()
  }
  @Get('deposits')
  async getTotalDeposits() {
    return this.transactionsService.getTotalDeposits()
  }
  @Get('credits')
  async getTotalCredits() {
    return this.transactionsService.getTotalCredits()
  }


}
