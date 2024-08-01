import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({
        required:true,
        unique:true,
        minlength:5
    })
    username: string;

    @Prop({
        required:true,
        minlength:8,
    })
    password: string;

    @Prop({
        default:0,
        required:false,
    })
    coins:number

    @Prop({
        default:1
    })
    level:number
}

export const UserSchema = SchemaFactory.createForClass(User);
