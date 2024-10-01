import { Module } from '@nestjs/common';
import { UserModule } from './user/user.modules';
import { CartModule } from './cart/cart.modules';


@Module({
  imports: [UserModule,CartModule],
  controllers: [],
  providers: [],
})
export class UserDashboardModule {}
