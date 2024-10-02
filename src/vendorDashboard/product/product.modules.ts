import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from 'src/models/product/product.schema';
import { productController } from './produt.controller';
import { ProductService } from './product.service';
import { ProductRepository } from 'src/models/product/product.repository';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';


@Module({
  imports: [ MongooseModule.forFeature([{ name : Product.name , schema : productSchema}]), UserMongoModule],
  controllers: [productController],
  providers: [ProductService,ProductRepository],
  exports : [ProductService,ProductRepository]
})
export class ProductModule {}
