import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Person, personSchema } from "src/models/common/person.schema";
import { Vendor, vendorSchema } from "src/models/vendor/vendor.schema";

@Module({
  imports: [ MongooseModule.forFeature([
    {
      name : Person.name,
      schema : personSchema,
      discriminators : [{ name : Vendor.name , schema : vendorSchema}]
    }])],
    controllers : [],
    providers : [],
    exports : [],
})
export class VendorModule {}