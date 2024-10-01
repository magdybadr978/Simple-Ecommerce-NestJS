import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CartRepository } from 'src/models/cart/cart.repository';
import { ProductRepository } from 'src/models/product/product.repository';
import { UserRepository } from 'src/models/user/user.repository';


@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository ,private readonly userRepository : UserRepository , private readonly productRepositry : ProductRepository) {}

  // add to cart for a user
  async addToCart(userId: Types.ObjectId, items: { productId: Types.ObjectId; quantity: number }) {
    // Destructure data from items
    const { productId, quantity } = items;
    // Check if user exists
    const user = await this.userRepository.getById(userId);
    if (!user) throw new NotFoundException('User does not exist');
    // Check if product exists
    const product = await this.productRepositry.getById(productId);
    if (!product) throw new NotFoundException('Product not found');
    // Get cart if it exists
    let cart = await this.cartRepository.getOne({ userId });
    // If the cart does not exist, create a new one
    if (!cart) {
      cart = await this.cartRepository.create({userId , items :[]});
    }
  
    // Check if the item already exists in the cart
    const itemExistIndex = cart.items.findIndex(item => item.productId.equals(productId));
  
    if (itemExistIndex > -1) {
      // If the item exists, increase the quantity
      cart.items[itemExistIndex].quantity += quantity;
    } else {
      // If the item doesn't exist, push it to the cart
      cart.items.push({ productId, quantity });
    }
  
    // Update the cart with the new or updated items
    return this.cartRepository.update({ _id: cart._id }, { items: cart.items }, { new: true });
  }
  
  // Get the cart by user ID
  async getCartByUserId(userId: Types.ObjectId) {
    const cart = await this.cartRepository.getById(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  // Add or update items in the cart
  async updateCart(userId: Types.ObjectId, items: { productId: Types.ObjectId; quantity: number }[]) {
    // check if user cart exist by userId
    const cart = await this.cartRepository.getById(userId)
    //failed
    if(!cart) throw new NotFoundException("cart not found")
      // return response
    return this.cartRepository.update({ userId }, { items }, { new: true });
  }

  // Remove an item from the cart
  async removeItemFromCart(userId: Types.ObjectId, productId: Types.ObjectId) {
    // get item and remove it
    const cart = await this.cartRepository.update(
      { userId },
      { $pull: { items: { productId: productId } } },
      { new: true },
    );
   // failed
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    // send response
    return cart;
  }

  // Delete a cart by user ID
  async deleteCart(userId: string):Promise<{message : string}> {
    // delete item by userId
    const result = await this.cartRepository.delete({_id : new Types.ObjectId(userId)});
    // failed 
    if (result.deletedCount === 0) {
      throw new NotFoundException('Cart not found');
    }

    return { message: 'Cart deleted successfully' };
  }
}
