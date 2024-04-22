import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true,
})

export class user{
    @Prop()
    name:String;

    @Prop()
    favBook:String;

    @Prop({unique: [true ,' Email Id already registered']})
    email:String;

    @Prop()
    password:String;
}

export const userSchema = SchemaFactory.createForClass(user)