import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CartRepository } from 'src/models/cart/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  // Create a new cart for a user
  async createCart(userId: Types.ObjectId, items: { product: Types.ObjectId; quantity: number }[]) {
    const newCart = {
      userId,
      items,
    };
    return this.cartRepository.create(newCart);
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
  async updateCart(userId: Types.ObjectId, items: { product: Types.ObjectId; quantity: number }[]) {
    return this.cartRepository.update({ userId }, { items }, { new: true, upsert: true });
  }

  // Remove an item from the cart
  async removeItemFromCart(userId: Types.ObjectId, productId: Types.ObjectId) {
    const cart = await this.cartRepository.update(
      { userId },
      { $pull: { items: { product: productId } } },
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
