import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { cartSchema } from "src/models/cart/cart.schema";
import { Order } from "src/models/order/order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "src/models/order/order.repository";
import { UserMongoModule } from "src/shared/modules/user-mongo.module";
import { ProductModule } from "src/vendorDashboard/product/product.modules";

@Module({
  imports : [ MongooseModule.forFeature([{ name : Order.name , schema : cartSchema}]),
  UserMongoModule,
  ProductModule
],
  controllers : [OrderController],
  providers : [OrderService , OrderRepository],
  exports : [OrderService , OrderRepository]
})
export class OrderModule {}