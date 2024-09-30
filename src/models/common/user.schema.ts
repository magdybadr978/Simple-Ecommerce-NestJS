import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, discriminatorKey: 'type' })
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  password: string;

  readonly _id:mongoose.Schema.Types.ObjectId;
}
export const userSchema= SchemaFactory.createForClass(User)
