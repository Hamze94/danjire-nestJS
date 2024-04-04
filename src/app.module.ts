import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { CardsModule } from './cards/cards.module';
import { ProductsModule } from './products/products.module';
dotenv.config();

@Module({
  imports: [
    CardsModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
