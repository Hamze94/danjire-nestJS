import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card.schema';

@Module({
    controllers: [CardsController],
    providers: [CardsService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Card.name,
                schema: CardSchema
            }
        ])
    ],
    exports: [CardsService, MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])], // Export CardsService and MongooseModule

})
export class CardsModule { }
