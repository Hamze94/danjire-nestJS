import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/entities/product.entites';
import { User } from 'src/users/entities/user.entity';
@Schema({ timestamps: true })
export class Order {
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], required: true })
    userId: User;
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Product' }], required: true })
    products: Product[];
    @Prop({ default: Date.now })
    orderDate: Date;

}
export const OrderSchema = SchemaFactory.createForClass(Order)