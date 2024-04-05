import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/transactions/entities/transaction.enities';
import { User } from 'src/schemas/users.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Card } from 'src/cards/entities/card.entity';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
    @InjectModel(User.name) private readonly userModel: Model<User>,

  ) { }
  async create(transactionData: CreateTransactionDto) {
    const { cardId, orderId, amount, type } = transactionData;
    const card = await this.cardModel.findOne({ "_id": cardId });
    if (!card) {
      throw new BadRequestException('Card not found');
    } else {
      const user = await this.userModel.findOne({ "_id": card.userId });
      if (user.role === 'CUSTOMER') {
        if (type === 'credit') {
          card.balance -= amount;
          await card.save();
        }
        if (type === 'deposit') {
          card.balance += amount;
          await card.save();
        }
      }
    }
    return await this.transactionModel.create(transactionData);
  }
  async findAll() {
    return await this.transactionModel.find({});
  }
  async findDeposits() {
    return await this.transactionModel.find({ type: 'depsit' });
  }
  async findCredits() {
    return await this.transactionModel.find({ type: 'credit' })
  }
  async update(id: string, transaction) {
    return await this.transactionModel.findByIdAndUpdate(id, transaction);
  }
  async remove(id: string) {
    return this.transactionModel.findByIdAndDelete(id)
  }
}
