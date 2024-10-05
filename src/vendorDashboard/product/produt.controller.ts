import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Types } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from './dto';


@Controller('dashboard-vendor/product')
export class productController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createproductDTO: CreateProductDTO,
  ) {
    return await this.productService.createProduct(createproductDTO);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getproductById(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateproduct(
    @Param('id') id: string,
    @Body() updateproductDTO: UpdateProductDTO,
  ) {
    return this.productService.updateproduct(
      id,
      updateproductDTO
    );
  }

  @Delete(':id')
  async deleteproduct(@Param('id') id: string) {
    return await this.productService.deleteproduct(id);
  }
}
