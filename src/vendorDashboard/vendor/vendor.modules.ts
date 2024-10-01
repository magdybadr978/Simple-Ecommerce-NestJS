import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, personSchema } from 'src/models/common/person.schema';
import { Vendor, vendorSchema } from 'src/models/vendor/vendor.schema';
import { VendorController } from './vendor.controller';
import { VendorRepository } from 'src/models/vendor/vendor.repository';
import { VendorService } from './vendor.service';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';

@Module({
  imports: [
    
    UserMongoModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorModule {}
