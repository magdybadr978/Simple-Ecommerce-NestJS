import { Document, Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Vendor } from "./vendor.schema";
import { InjectModel } from "@nestjs/mongoose";


export class VendorRepository extends AbstractRepository<Vendor>{
  constructor(@InjectModel(Vendor.name) private vendorModel : Model<Vendor & Document>) {
    super(vendorModel);
  }
}