import { AbstractRepository } from "../abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { Cart } from "./cart.schema";

export class CartRepository extends AbstractRepository<Cart>{
  constructor(@InjectModel(Cart.name) cartModel : Model<Cart & Document>) {
    super(cartModel)
  }
}