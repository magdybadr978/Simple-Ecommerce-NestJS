import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartRepository } from 'src/models/cart/cart.repository';
import { Cart, cartSchema } from 'src/models/cart/cart.schema';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { ProductModule } from 'src/vendorDashboard/product/product.modules';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
    //  UserModule,
    UserMongoModule,
    ProductModule,
    //  { name: Person.name, schema: personSchema ,discriminators: [{name : User.name , schema : userSchema}] },
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export class CartModule {}
