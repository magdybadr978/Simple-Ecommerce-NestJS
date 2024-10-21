import { Body, Controller, Param, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDTO } from "./dto";
import { Types } from "mongoose";


@Controller('dashboard-user/order')
export class OrderController{
  constructor(private readonly orderService : OrderService) {}

  @Post('create')
  async createOrder(@Body() createOrderDTO : CreateOrderDTO){
    return await this.orderService.createNewOrder(createOrderDTO)
  }

  @Post('/:id')
  async cancelOrder(@Param() id : string){
    return await this.orderService.cancelOrder(new Types.ObjectId(id))
  }



}