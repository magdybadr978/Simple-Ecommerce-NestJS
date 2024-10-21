import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Order_Status } from '../common/constants';

export type OrderDocument = Order & Document

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([{
    productId: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',required: true},
    quantity : {type : Number , required : true},
    price : {type : Number , required : true}
}])
  products: {
    productId: Types.ObjectId;
    quantity : number
    price : number
  }[];

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Number, default: 0, required: true })
  price: number;

  @Prop({ type: String, enum: Order_Status, default: 'placed' })
  status: string;

  readonly _id?: mongoose.Schema.Types.ObjectId;
}
export const orderSchema = SchemaFactory.createForClass(Order)
