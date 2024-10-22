import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String , trim : true , required : true})
  name: string;

  @Prop({ type: String , trim : true})
  description: string;

  @Prop({ type : Number , required : true})
  price : number;

  @Prop({type : String})
  photo : string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
  vendorId: Types.ObjectId;

  readonly _id?: mongoose.Schema.Types.ObjectId;
}

export const productSchema = SchemaFactory.createForClass(Product);
