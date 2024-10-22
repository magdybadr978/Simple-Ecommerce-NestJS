import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from 'src/models/product/product.schema';
import { productController } from './produt.controller';
import { ProductService } from './product.service';
import { ProductRepository } from 'src/models/product/product.repository';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { AuthService } from 'src/Guards/Auth.service';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/Guards/Authorization';
import { FileService } from 'src/common/services/file-upload.service';



@Module({
  imports: [ MongooseModule.forFeature([{ name : Product.name , schema : productSchema}]), UserMongoModule],
  controllers: [productController],
  providers: [ProductService,ProductRepository,AuthService,JwtService,RolesGuard,FileService],
  exports : [ProductService,ProductRepository, FileService]
})
export class ProductModule {}
