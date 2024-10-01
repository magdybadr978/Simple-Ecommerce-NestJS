import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { ProductRepository } from "src/models/product/product.repository";
import { Product } from "src/models/product/product.schema";
import { CreateProductDTO, UpdateProductDTO } from "./dto";


@Injectable()
export class ProductService {
  constructor(private readonly productRepository : ProductRepository) {}

  // create product
  async createProduct(createProductDTO : CreateProductDTO){
      const product = await this.productRepository.create(createProductDTO);
      if(!product) throw new BadGatewayException("failed to create product")
      return product;
  }

  //get All products
  async getAllProducts() {
    const products = await this.productRepository.getAll({});
    if(products.length == 0) throw new NotFoundException("There is no Products")
    return {products}
  }

  // Get a product by id
  async getproductById(id: string) {
    const product = await this.productRepository.getOne({
      _id: new Types.ObjectId(id),
    });
    if (!product) throw new NotFoundException('product not found');

    return { product };
  }

  // Update a product by id
  async updateproduct(
    id: string,
    updateproductDTO: UpdateProductDTO,
  ) {
    return this.productRepository.update(
      { _id: new Types.ObjectId(id) },
      updateproductDTO,
      { new: true },
    );
  }

  // Delete a product by id
  async deleteproduct(id: string): Promise<{ message: string }> {
    const product = await this.productRepository.delete({
      _id: new Types.ObjectId(id),
    });
    if (product.deletedCount == 0) {
      throw new NotFoundException('product not found');
    }
    return { message: 'Deleted product successfully' };
  } 
}