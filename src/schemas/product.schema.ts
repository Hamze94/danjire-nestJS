import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Product {
    @Prop({
        type: String,
        required: true
    })
    name: string;
    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    costPrice: number;
    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    sellingPrice: number;
    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    quantity: number;
    @Prop({
        type: String,
        required: true,
        default: ''
    })
    description: string;
    @Prop({
        type: String,
    })

    imageUrl: string;
    @Prop({
        type: String,
    })
    image: string;
    @Prop({
        type: Date,
        required: true,
    })
    expireyDate: Date;
    @Prop({ type: String, ref: 'Category' })
    categoryId: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);