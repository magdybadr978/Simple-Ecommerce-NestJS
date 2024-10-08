import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/Guards/Auth.service';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { RolesGuard } from 'src/Guards/Authorization';

@Module({
  imports: [
    UserMongoModule,
  ],
  controllers: [VendorController],
  providers: [VendorService,AuthService,JwtService,RolesGuard],
  exports: [VendorService],
})
export class VendorModule {}
