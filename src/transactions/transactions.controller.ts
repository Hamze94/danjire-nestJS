import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) { }
  @Post('create')
  async createTransaction(@Body() transactionData: CreateTransactionDto) {
    return this.transactionsService.create(transactionData);
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
