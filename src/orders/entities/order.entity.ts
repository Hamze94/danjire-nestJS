import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/entities/product.entites';
import { User } from 'src/users/entities/user.entity';
@Schema({ timestamps: true })
export class Order {
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], required: true })
    userId: User;
    @Prop({ required: true, type: [{ productId: String, quantity: Number }] })
    products: { productId: string; quantity: number }[];
    @Prop({ default: Date.now })
    orderDate: Date;

}
export const OrderSchema = SchemaFactory.createForClass(Order)