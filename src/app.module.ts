import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorDashboardModule } from './vendorDashboard/vendorDashboard.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dinamoDB'),
    VendorDashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
