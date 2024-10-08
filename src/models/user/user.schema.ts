import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document; 

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class User {
  name: string;
  phone: string;
  password: string;
  role : string;
  readonly _id?: mongoose.Schema.Types.ObjectId;
}

export const userSchema = SchemaFactory.createForClass(User);
