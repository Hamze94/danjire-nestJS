import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Category {
    @Prop({
        type: String,
        required: true,
    })
    name: string;
    @Prop({
        type: String
    })
    description: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)