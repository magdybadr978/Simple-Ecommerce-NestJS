import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { CreateResponse, DeleteResponse, GetAllResponse, GetAllWithPagination, GetOneResponse, UpdateResponse } from "src/common/dto/response.dto";
import { ProductRepository } from "src/models/product/product.repository";
import { Product, ProductDocument } from "src/models/product/product.schema";
import { CreateProductDTO, UpdateProductDTO } from "./dto";
import { VendorRepository } from "src/models/vendor/vendor.repository";
import { FileService } from "src/common/services/file-upload.service";
import * as path from "path";
import * as fs from "fs";
import { UPLOADS_DIRECTORY } from "src/config/constants";
import { GetAll } from "src/common/type";


@Injectable()
export class ProductService {
  constructor(private readonly productRepository : ProductRepository , private readonly vendorRepository : VendorRepository , private readonly fileService : FileService) {}

  // create product
  async createProduct(createProductDTO : CreateProductDTO , file : Express.Multer.File):Promise<CreateResponse<Product>>{
    // check if vendor exist
      const vendor = await this.vendorRepository.getOne({_id : createProductDTO.vendorId})
      // failed
      if(!vendor) throw new NotFoundException("vendor not exist")
        //Handle file upload
      let filePath = '';
      // if file exist
      if(file){
        filePath = await this.fileService.uploadFile(file);
      }
      // wrapping data in variable
      const productData = {...createProductDTO , photo : filePath}
      // use create method 
      const product = await this.productRepository.create(productData) as ProductDocument;
      // failed
      if(!product) throw new BadGatewayException("failed to create product") 
        // send response
      return {success : true , data : product};
  }

  //get All products
  async getAllProducts(
    page : number = 1 ,
    limit : number = 3 ,
    sort : string = 'name' ,
    order: 'asc' | 'desc' = 'asc'):Promise<GetAllResponse<Product>> {
    // define the pagination number
    const params : GetAll = { page , limit , sort , order , paginate : true};
    // use getAll method
    const products = await this.productRepository.getAll({} , params);
    // check if there is no products
    if(products.length === 0) throw new NotFoundException("There is no Products")
      // send response
    return {success : true , data : products }
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
    const updatedProduct = await this.productRepository.update({ _id: new Types.ObjectId(id) },updateproductDTO,{ new: true , lean : true}) as unknown as  ProductDocument;
    return {success : true , data : updatedProduct}
  }

  // Delete a product by id
  async deleteproduct(id: string): Promise<DeleteResponse> {
    // get product to check if there is a photo
    const productExist = await this.productRepository.getOne({_id : new Types.ObjectId(id)})
    // product not found
    if(!productExist) throw new NotFoundException("product not exist")
      // if product has a photo , delete it
    if(productExist.photo){
      const photoPath = path.join(UPLOADS_DIRECTORY,productExist.photo)
      try {
        if(fs.existsSync(photoPath)){
          fs.unlinkSync(photoPath) // delete photo from file system
        }
      } catch (error) {
        throw new BadGatewayException("failed to delete photo")
      }
    }
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