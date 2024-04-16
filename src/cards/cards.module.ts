import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './entities/card.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [CardsController],
    providers: [CardsService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Card.name,
                schema: CardSchema
            }
        ]),
        AuthModule
    ],
    exports: [CardsService, MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])], // Export CardsService and MongooseModule

})
export class CardsModule { }
