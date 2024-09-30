import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, personSchema } from 'src/models/common/person.schema';
import { User, userSchema } from 'src/models/user/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from 'src/models/user/user.repository';
import { UserService } from './user.service';


@Module({
  imports: [ MongooseModule.forFeature([
    {
      name : Person.name,
      schema : personSchema,
      discriminators : [{ name : User.name , schema : userSchema}]
    }
  ])],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports : [UserService,UserRepository]
})
export class UserModule {}
