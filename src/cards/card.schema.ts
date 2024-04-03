import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Card extends Document {
    @Prop({ type: String, ref: 'User', required: true })
    userId: string;

    @Prop({ type: Number, default: 0 })
    balance: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);
