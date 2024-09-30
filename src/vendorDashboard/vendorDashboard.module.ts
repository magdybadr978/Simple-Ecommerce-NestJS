import { Module } from '@nestjs/common';
import { VendorModule } from './vendor/vendor.modules';


@Module({
  imports: [VendorModule],
  controllers: [],
  providers: [],
})
export class VendorDashboardModule {}
