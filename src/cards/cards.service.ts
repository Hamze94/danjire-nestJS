import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
    constructor(@InjectModel(Card.name) private readonly cardModel: Model<Card>) { }

    async create(cardData: CreateCardDto) {
        const existingCard = await this.cardModel.findOne({ userId: cardData.userId }).exec();
        if (existingCard) {
            throw new BadRequestException('User Already Has a Card');
        }
        return this.cardModel.create(cardData);
    }

    async findAll() {
        return this.cardModel.find().exec();
    }

    async findCardByUser(userId: string) {
        const card = await this.cardModel.findOne({ userId }).exec();
        if (!card) {
            throw new BadRequestException('Card not found for the user');
        }
        return card;
    }

    async delete(id: string) {
        return this.cardModel.findByIdAndDelete(id).exec();
    }
}
