import { Module } from '@nestjs/common';
import { VendorModule } from './vendor/vendor.modules';
import { ProductModule } from './product/product.modules';


@Module({
  imports: [VendorModule,ProductModule],
  controllers: [],
  providers: [],
})
export class VendorDashboardModule {}
