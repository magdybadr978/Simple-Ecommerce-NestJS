import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service'; 
import { Types } from 'mongoose';

@Controller('dashboard-user/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create/:userId')
  async addToCart(
    @Param('userId') userId: string,
    @Body("items") items: { productId: Types.ObjectId; quantity: number },
  ) {
    
    return await this.cartService.addToCart(new Types.ObjectId(userId),items);
  }

  @Get('get/:userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCartByUserId(new Types.ObjectId(userId));
  }

  @Put('update/:userId')
  async updateCart(
    @Param('userId') userId: string,
    @Body('items') items: { productId: Types.ObjectId; quantity: number }[],
  ) {
    return this.cartService.updateCart(new Types.ObjectId(userId), items);
  }

  @Delete(':userId/:productId')
  async removeItemFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeItemFromCart(new Types.ObjectId(userId), new Types.ObjectId(productId));
  }

  @Delete(':userId')
  async deleteCart(@Param('userId') userId: string) {
    return this.cartService.deleteCart(userId);
  }
}
