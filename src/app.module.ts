import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorDashboardModule } from './vendorDashboard/vendorDashboard.module';
import { UserDashboardModule } from './userDashboard/userDashboard.modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dinamoDB'),
    VendorDashboardModule,
    UserDashboardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
