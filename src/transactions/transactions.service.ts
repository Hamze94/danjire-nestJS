import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/transactions/entities/transaction.enities';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';

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
    return await this.transactionModel.find({ type: 'deposit' });
  }

  async getTotalDeposits() {
    const deposits = await this.findDeposits();
    let total = 0;
    deposits.forEach(deposit => {
      total += deposit.amount;
    });
    console.log(total)
    return total;
  }
  async findCredits() {
    return await this.transactionModel.find({ type: 'credit' })
  }
  async getTotalCredits() {
    const credits = await this.findCredits();
    let total = 0;
    credits.forEach(credit => {
      total += credit.amount;
    });
    console.log(total)
    return total;
  }
  async update(id: string, transaction) {
    return await this.transactionModel.findByIdAndUpdate(id, transaction);
  }
  async remove(id: string) {
    return this.transactionModel.findByIdAndDelete(id)
  }
}
