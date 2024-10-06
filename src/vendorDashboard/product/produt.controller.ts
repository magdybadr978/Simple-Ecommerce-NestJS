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
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Types } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import { AuthGuard } from 'src/Guards/Authentication';


@Controller('dashboard-vendor/product')
export class productController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createproductDTO: CreateProductDTO,
  ) {
    return await this.productService.createProduct(createproductDTO);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getProductById(@Param('id') id: string) {
    return await this.productService.getproductById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async deleteproduct(@Param('id') id: string) {
    return await this.productService.deleteproduct(id);
  }
}
