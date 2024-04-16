import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User {
    @Prop({
        type: String,
        required: true
    })
    name: string;
    @Prop({
        type: String,
        required: true
    })
    email: string;
    @Prop({
        type: String,
        required: true,
    })
    password: string;
    @Prop({
        type: String,
        default: "USER"
    })
    role: string;
    @Prop({
        type: String,
    })
    description: string;
}
export const UserSchema = SchemaFactory.createForClass(User);