import { Module } from '@nestjs/common';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/Guards/Auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule,
  ],
  controllers: [UserController],
  providers: [UserService,AuthService,JwtService],
  exports: [UserService],
})
export class UserModule {}
