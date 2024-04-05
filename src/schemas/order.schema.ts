import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from "./product.schema";
import mongoose from 'mongoose';
import { User } from './users.schema';
@Schema({ timestamps: true })
export class Order {
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], required: true })
    user: User;
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Product' }], required: true })
    products: Product[];
    @Prop({ default: Date.now })
    orderDate: Date;

}
export const OrderSchema = SchemaFactory.createForClass(Order)