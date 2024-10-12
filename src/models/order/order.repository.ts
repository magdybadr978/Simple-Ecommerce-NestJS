import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Order } from "./order.schema";
import { Document, Model } from "mongoose";


export class OrderRepository extends AbstractRepository<Order>{
  constructor(@InjectModel(Order.name) orderModel : Model<Order & Document>) {
    super(orderModel)
  }
}