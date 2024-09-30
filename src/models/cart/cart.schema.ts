import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types , Document } from "mongoose";


@Schema({timestamps : true})
export class Cart{
  @Prop({type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true})
  userId : Types.ObjectId;

  @Prop([{
    product : {type : mongoose.Schema.Types.ObjectId , ref : "Product" ,required : true},
    quantity : { type : Number , required : true, default : 0}
  }])
  items : { product : Types.ObjectId , quantity : number}[]
}
export const  cartSchema = SchemaFactory.createForClass(Cart);