import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Types } from 'mongoose';


@Controller('dashboard-vendor/product')
export class productController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  async createProduct(
    @Body() createproductDTO: { name: string , description: string , vendorId : Types.ObjectId },
  ) {
    return await this.productService.createProduct(createproductDTO);
  }

  @Get('getAll')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get('getSpecific/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getproductById(id);
  }

  @Put('update/:id')
  async updateproduct(
    @Param('id') id: string,
    @Body() updateproductDTO: { name: string , description: string },
  ) {
    return this.productService.updateproduct(
      id,
      updateproductDTO
    );
  }

  @Delete('delete/:id')
  async deleteproduct(@Param('id') id: string) {
    return await this.productService.deleteproduct(id);
  }
}
