import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, personSchema } from 'src/models/common/person.schema';
import { UserRepository } from 'src/models/user/user.repository';
import { User, userSchema } from 'src/models/user/user.schema';
import { VendorRepository } from 'src/models/vendor/vendor.repository';
import { Vendor, vendorSchema } from 'src/models/vendor/vendor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Person.name,
        schema: personSchema,
        discriminators: [
          { name: User.name, schema: userSchema },
          { name: Vendor.name, schema: vendorSchema },
        ],
      },
    ]),
  ],
  providers: [UserRepository, VendorRepository],
  exports: [UserRepository, VendorRepository],
})
export class UserMongoModule {}
