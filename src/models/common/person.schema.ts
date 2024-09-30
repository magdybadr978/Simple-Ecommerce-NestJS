import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Person {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  password: string;

  readonly _id: mongoose.Schema.Types.ObjectId;
}
export const personSchema = SchemaFactory.createForClass(Person);
