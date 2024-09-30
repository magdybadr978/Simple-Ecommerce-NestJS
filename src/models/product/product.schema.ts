import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
  vendorId: Types.ObjectId;

  readonly _id?: mongoose.Schema.Types.ObjectId;
}

export const productSchema = SchemaFactory.createForClass(Product);
