import { Module } from '@nestjs/common';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    UserMongoModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
