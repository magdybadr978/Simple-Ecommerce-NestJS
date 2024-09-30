import { Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps : true , discriminatorKey : "role"})
export class Vendor {
  name : string;
  phone : string;
  password : string
  readonly _id? : mongoose.Schema.Types.ObjectId;
}

export const vendorSchema = SchemaFactory.createForClass(Vendor);