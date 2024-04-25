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
    const { cardId, amount, type } = transactionData;

    const card = await this.cardModel.findOne({ "_id": cardId });
    if (!card) {
      throw new BadRequestException('Card not found');
    }

    const user = await this.userModel.findOne({ "_id": card.userId });
    if (!(user.role === 'CUSTOMER' || user.role === 'USER')) return;

    card.balance += (type === 'DEPOSIT') ? parseInt(amount as string) : -parseInt(amount as string);
    await card.save();

    return await this.transactionModel.create(transactionData);
  }

  async findAll() {
    return await this.transactionModel.find({});
  }
  async findDeposits() {
    return await this.transactionModel.find({ type: 'DEPOSIT' });
  }

  async getTotalDeposits() {
    const deposits = await this.findDeposits();
    let total = 0;
    deposits.forEach(deposit => {
      total += deposit.amount;
    });
    return total;
  }
  async findCredits() {
    return await this.transactionModel.find({ type: 'CREDIT' })
  }
  async getTotalCredits() {
    const credits = await this.findCredits();
    let total = 0;
    credits.forEach(credit => {
      total += credit.amount;

    });
    return total;
  }
  async update(id: string, transaction) {
    return await this.transactionModel.findByIdAndUpdate(id, transaction);
  }
  async remove(id: string) {
    return this.transactionModel.findByIdAndDelete(id)
  }
  async findUserTransactions(userId: string) {
    const card = await this.cardModel.findOne({ userId });
    if (!card) {
      throw new BadRequestException('Card not found for user');
    }
    const idString = card._id.toString();
    const userTranstions = await this.transactionModel.find({ cardId: idString });
    return userTranstions

  }
}
