import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/transactions/entities/transaction.enities';
import { CardsModule } from 'src/cards/cards.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema
      }
    ]),
    CardsModule,
    UsersModule
  ]
})
export class TransactionsModule { }
