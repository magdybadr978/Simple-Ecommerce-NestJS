import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { cartSchema } from "src/models/cart/cart.schema";
import { Order } from "src/models/order/order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "src/models/order/order.repository";

@Module({
  imports : [ MongooseModule.forFeature([{ name : Order.name , schema : cartSchema}]),
  OrderModule
],
  controllers : [OrderController],
  providers : [OrderService , OrderRepository],
  exports : [OrderService , OrderRepository]
})
export class OrderModule {}