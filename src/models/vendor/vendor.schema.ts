import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VendorDocument = Vendor & Document;

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Vendor {
  name: string;
  phone: string;
  password: string;
  role : string;
  readonly _id?: mongoose.Schema.Types.ObjectId;
}

export const vendorSchema = SchemaFactory.createForClass(Vendor);
