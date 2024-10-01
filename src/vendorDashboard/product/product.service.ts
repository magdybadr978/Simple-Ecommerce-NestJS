import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { CreateResponse, DeleteResponse, GetAllResponse, GetOneResponse, UpdateResponse } from "src/common/dto/response.dto";
import { ProductRepository } from "src/models/product/product.repository";
import { Product, ProductDocument } from "src/models/product/product.schema";
import { CreateProductDTO, UpdateProductDTO } from "./dto";


@Injectable()
export class ProductService {
  constructor(private readonly productRepository : ProductRepository) {}

  // create product
  async createProduct(createProductDTO : CreateProductDTO):Promise<CreateResponse<Product>>{
     // use create method 
      const product = await this.productRepository.create(createProductDTO) as ProductDocument;
      // failed
      if(!product) throw new BadGatewayException("failed to create product") 
        // send response
      return {success : true , data : product};
  }

  //get All products
  async getAllProducts():Promise<GetAllResponse<Product>> {
    // use getAll method
    const products = await this.productRepository.getAll({});
    // check if there is no products
    if(products.length == 0) throw new NotFoundException("There is no Products")
      // send response
    return {success : true , data : products}
  }

  // Get a product by id
  async getproductById(id: string):Promise<GetOneResponse<Product>> {
    // check if user exist
    const product = await this.productRepository.getOne({
      _id: new Types.ObjectId(id),
    });
    // failed
    if (!product) throw new NotFoundException('product not found');
    // send response
    return { success : true , data : product };
  }

  // Update a product by id
  async updateproduct(id: string,updateproductDTO: UpdateProductDTO):Promise<UpdateResponse<Product>> {
    // check if product exist
    const product = await this.productRepository.getOne({_id : new Types.ObjectId(id)})
    // failed
    if(!product) throw new NotFoundException("product not found");
    // update product
    const updatedProduct =this.productRepository.update({ _id: new Types.ObjectId(id) },updateproductDTO,{ new: true }) as unknown as  ProductDocument;
    return {success : true , data : updatedProduct}
  }

  // Delete a product by id
  async deleteproduct(id: string): Promise<DeleteResponse> {
    // use method delete with id
    const product = await this.productRepository.delete({
      _id: new Types.ObjectId(id),
    });
    // failed
    if (product.deletedCount == 0) {
      throw new NotFoundException('product not found');
    }
    // send response
    return { success : true };
  } 
}