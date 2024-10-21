import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderRepository } from "src/models/order/order.repository";
import { Order, orderSchema } from "src/models/order/order.schema";
import { UserMongoModule } from "src/shared/modules/user-mongo.module";
import { ProductModule } from "src/vendorDashboard/product/product.modules";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  imports : [ MongooseModule.forFeature([{ name : Order.name , schema : orderSchema}]),
  UserMongoModule,
  ProductModule
],
  controllers : [OrderController],
  providers : [OrderService , OrderRepository],
  exports : [OrderService , OrderRepository]
})
export class OrderModule {}