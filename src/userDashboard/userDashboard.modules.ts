import { Module } from '@nestjs/common';
import { UserModule } from './user/user.modules';


@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class UserDashboardModule {}
