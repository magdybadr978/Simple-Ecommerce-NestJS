import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, personSchema } from 'src/models/common/person.schema';
import { User, userSchema } from 'src/models/user/user.schema';


@Module({
  imports: [ MongooseModule.forFeature([
    {
      name : Person.name,
      schema : personSchema,
      discriminators : [{ name : User.name , schema : userSchema}]
    }
  ])],
  controllers: [],
  providers: [],
})
export class UserModule {}
