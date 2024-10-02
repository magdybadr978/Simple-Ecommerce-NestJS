import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateResponse, DeleteResponse, GetOneResponse, UpdateResponse } from 'src/common/dto/response.dto';
import { CartRepository } from 'src/models/cart/cart.repository';
import { Cart, CartDocument } from 'src/models/cart/cart.schema';
import { ProductRepository } from 'src/models/product/product.repository';
import { UserRepository } from 'src/models/user/user.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepositry: ProductRepository,
  ) {}

  // add to cart for a user
  async addToCart(
    userId: Types.ObjectId,
    items: { productId: Types.ObjectId; quantity: number },
  ):Promise<CreateResponse<Cart>> {
    // Destructure data from items
    const { productId, quantity } = items;
    // Check if user exists
    const user = await this.userRepository.getById(userId);
    // if user not exist
    if (!user) throw new NotFoundException('User does not exist');
    // Check if product exists
    const product = await this.productRepositry.getById(productId);

    //  failed
    if (!product) throw new NotFoundException('Product not found');
    // Get cart if it exists
    let cart = await this.cartRepository.getOne({ userId });
    // If the cart does not exist, create a new one
    if (!cart) {
      cart = (await this.cartRepository.create({
        userId: userId,
        items: [],
      })) as CartDocument;
    }

    // Check if the item already exists in the cart
    const itemExistIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId),
    );

    if (itemExistIndex > -1) {
      // If the item exists, increase the quantity
      cart.items[itemExistIndex].quantity += quantity;
    } else {
      // If the item doesn't exist, push it to the cart
      cart.items.push({ productId, quantity });
    }

    // Update the cart with the new or updated items
    const updatedCart = this.cartRepository.update({ _id: cart._id },{ items: cart.items },{ new: true }) as unknown as CartDocument;
    return {success : true , data :updatedCart}
  }

  // Get the cart by user ID
  async getCartByUserId(userId: Types.ObjectId):Promise<GetOneResponse<Cart>> {
    const cart = await this.cartRepository
      .getOne({userId} , {},{ populate: [{ path: 'items.productId'}]})
      
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return {success : true , data : cart};
  }

  // Remove an item from the cart
  async removeItemFromCart(userId: Types.ObjectId, productId: Types.ObjectId):Promise<UpdateResponse<Cart>> {
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
    return {success : true , data : cart};
  }

  // Delete a cart by user ID
  async deleteCart(userId: string): Promise<DeleteResponse> {
    // delete item by userId
    const result = await this.cartRepository.delete({
      userId: new Types.ObjectId(userId),
    });
    // failed
    if (result.deletedCount === 0) {
      throw new NotFoundException('Cart not found');
    }

    return {success : true};
  }
}
