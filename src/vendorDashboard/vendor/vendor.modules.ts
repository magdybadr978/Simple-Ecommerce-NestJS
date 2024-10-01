import { Module } from '@nestjs/common';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';

@Module({
  imports: [
    
    UserMongoModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorModule {}
