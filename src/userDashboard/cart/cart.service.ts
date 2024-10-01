import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CartRepository } from 'src/models/cart/cart.repository';
import { ProductRepository } from 'src/models/product/product.repository';
import { UserRepository } from 'src/models/user/user.repository';


@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository ,private readonly userRepository : UserRepository , private readonly productRepositry : ProductRepository) {}

  // add to cart for a user
  async addToCart(userId: Types.ObjectId, items: {productId: Types.ObjectId ,quantity: number}) {
    // destruct data from items
    const {productId , quantity } = items;
    // check if user exist
    const user = this.userRepository.getById(userId)
    // if user not exist
    if(!user) throw new NotFoundException("user not exist")
      // check if product exist 
    const product = this.productRepositry.getById(productId);
    // check if product not exist
    if(!product) throw new NotFoundException("product not found")
      // get cart if exist
    const cart = this.cartRepository.getById(userId)
    // check if not exist
    if(!cart){
      await this.cartRepository.create({userId , items : []})
    }
    // if item already exist
    const itemExist = (await cart).items.findIndex(item => item.productId.equals(productId))
    if(itemExist > -1){
      // add ++ on exist item
      (await cart).items[itemExist].quantity += quantity;
    }else {
      (await cart).items.push({productId ,quantity })
    }
  
    return this.cartRepository.update({userId},{items : (await cart).items},{new : true});
  }

  // Get the cart by user ID
  async getCartByUserId(userId: Types.ObjectId) {
    const cart = await this.cartRepository.getOne({ userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  // Add or update items in the cart
  async updateCart(userId: Types.ObjectId, items: { productId: Types.ObjectId; quantity: number }[]) {
    return this.cartRepository.update({ userId }, { items }, { new: true, upsert: true });
  }

  // Remove an item from the cart
  async removeItemFromCart(userId: Types.ObjectId, productId: Types.ObjectId) {
    const cart = await this.cartRepository.update(
      { userId },
      { $pull: { items: { productId: productId } } },
      { new: true },
    );

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  // Delete a cart by user ID
  async deleteCart(userId: Types.ObjectId) {
    const result = await this.cartRepository.delete({ userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Cart not found');
    }
    return { message: 'Cart deleted successfully' };
  }
}
