import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "src/models/order/order.repository";
import { CreateOrderDTO } from "./dto";
import { CreateResponse, DeleteResponse, GetOneResponse } from "src/common/dto/response.dto";
import { Order, OrderDocument } from "src/models/order/order.schema";
import { UserRepository } from "src/models/user/user.repository";
import { ProductRepository } from "src/models/product/product.repository";
import { Types } from "mongoose";


@Injectable()
export class OrderService {
  constructor(private readonly orderRepository : OrderRepository , private readonly userRepository : UserRepository , private readonly productRepository : ProductRepository) {}

  // create order
  async createNewOrder(createOrderDTO : CreateOrderDTO) : Promise<CreateResponse<Order>>{
    // check if user exist 
    const user = await this.userRepository.getOne({_id : new Types.ObjectId(createOrderDTO.userId)})
    // failed
    if(!user) throw new NotFoundException("user not found")
      // make total price
    let totalPrice = 0
    const orderProducts = []
    for (const item of createOrderDTO.products) { 
      // get product by id
      const product = await this.productRepository.getOne({ _id : item.productId})
      // failed
      if(!product) throw new NotFoundException(`product ${item.productId} not exist`)
      // add order products 
      orderProducts.push({ productId : product._id , quantity : item.quantity , price : product.price})
      // get total price
      totalPrice += product.price * item.quantity
    }
    // wrapping data
    const totalOrder = {...createOrderDTO ,products : orderProducts, price : totalPrice}
    //create new order
    const order = await this.orderRepository.create(totalOrder) as unknown as OrderDocument
    // send response
    return { success : true , data : order}
  }


  // cancel order
  async cancelOrder(id :Types.ObjectId) : Promise <DeleteResponse>{
    // get order
    const order = await this.orderRepository.getOne({_id : new Types.ObjectId(id)})
    // check if order exist
    if(!order) throw new NotFoundException("order not found")
      // check if order shipped or delivered
    if(order.status == "shipped" || order.status == "delivered"){
      // failed
      throw new BadRequestException("can not cancel this order")
    }
    // make stauts cancelled
    order.status = "cancelled"
    await order.save();
    // send response
    return { success : true }
  }

  // get Order
  async getOrder(id : Types.ObjectId) : Promise <GetOneResponse<Order>>{
    // get order 
    const order = await this.orderRepository.getOne({_id : new Types.ObjectId(id)})
    // check if order exist
    if(!order) throw new NotFoundException("order not found")
    // send response
    return { success : true , data : order}
  }
}