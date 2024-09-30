import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Product } from "./product.schema";
import { Document, Model } from "mongoose";

export class ProductRepository extends AbstractRepository<Product>{
  constructor(@InjectModel(Product.name) productModel : Model<Product & Document>) {
    super(productModel)
  }
}
