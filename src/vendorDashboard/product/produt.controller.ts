import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/Guards/Authentication';
import { RolesGuard } from 'src/Guards/Authorization';
import { Roles } from 'src/common/Guards/roles.decorator';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import { ProductService } from './product.service';


@Controller('dashboard-vendor/product')
export class productController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Vendor')
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createproductDTO: CreateProductDTO,
  ) {
    return await this.productService.createProduct(createproductDTO);
  }

  @Get()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Vendor')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getProductById(@Param('id') id: string) {
    return await this.productService.getproductById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Vendor')
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
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Vendor')
  async deleteproduct(@Param('id') id: string) {
    return await this.productService.deleteproduct(id);
  }
}
