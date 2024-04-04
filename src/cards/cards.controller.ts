import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
    constructor(private cardService: CardsService) { }

    @Post('/create')
    async createCard(@Body() cardData: CreateCardDto) {
        return this.cardService.create(cardData);
    }

    @Get()
    async getAllCards() {
        return this.cardService.findAll();
    }

    @Get('/:userId')
    async getUserCard(@Param('userId') userId: string) {
        return this.cardService.findCardByUser(userId);
    }

    @Delete(':id/delete')
    async deletCard(@Param('id') id: string) {
        return this.cardService.delete(id);
    }
}
