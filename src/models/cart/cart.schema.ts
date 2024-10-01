import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types , Document } from "mongoose";

export type CartDocument = Cart & Document;

@Schema({timestamps : true})
export class Cart{
  @Prop({type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true})
  userId : Types.ObjectId;

  @Prop([{
    productId : {type : mongoose.Schema.Types.ObjectId , ref : "Product" ,required : true},
    quantity : { type : Number , required : true, default : 1}
  }])
  items : { productId : Types.ObjectId , quantity : number}[]
}
export const  cartSchema = SchemaFactory.createForClass(Cart);