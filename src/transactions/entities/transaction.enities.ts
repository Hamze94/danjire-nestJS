import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Order } from "../../schemas/order.schema";
import { Card } from "src/cards/entities/card.entity";

@Schema({ timestamps: true })
export class Transaction {
    @Prop({
        required: true,
        type: Number,
        default: 0
    })
    amount: number
    @Prop({
        type:
            [{ type: mongoose.Types.ObjectId, ref: 'Card' }],
        required: true
    })
    cardId: Card;
    @Prop({
        type:
            [{ type: mongoose.Types.ObjectId, ref: 'Order' }],
    })
    orderId: Order;
    @Prop({
        type: Date,
        required: true,
        default: Date.now()
    })
    date: Date
    @Prop({
        type: String,
        required: true,
    })
    type: string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)


