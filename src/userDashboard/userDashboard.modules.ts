import { Module } from '@nestjs/common';
import { UserModule } from './user/user.modules';
import { CartModule } from './cart/cart.modules';
import { OrderModule } from './order/order.modules';


@Module({
  imports: [UserModule,CartModule,OrderModule],
  controllers: [],
  providers: [],
})
export class UserDashboardModule {}
