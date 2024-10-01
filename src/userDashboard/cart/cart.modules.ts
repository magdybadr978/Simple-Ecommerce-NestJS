import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from 'src/models/cart/cart.schema';
import { CartController } from './cart.controller';
import { CartRepository } from 'src/models/cart/cart.repository';
import { CartService } from './cart.service';
import { User, userSchema } from 'src/models/user/user.schema';
import { UserRepository } from 'src/models/user/user.repository';
import { UserService } from '../user/user.service';
import { Person, personSchema } from 'src/models/common/person.schema';
import { UserModule } from '../user/user.modules';
import { ProductModule } from 'src/vendorDashboard/product/product.modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: cartSchema }]),
       UserModule,
       ProductModule
      //  { name: Person.name, schema: personSchema ,discriminators: [{name : User.name , schema : userSchema}] },
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export class CartModule {}
