import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Person, personSchema } from "src/models/common/person.schema";
import { Vendor, vendorSchema } from "src/models/vendor/vendor.schema";
import { VendorController } from "./vendor.controller";
import { VendorRepository } from "src/models/vendor/vendor.repository";
import { VendorService } from "./vendor.service";

@Module({
  imports: [ MongooseModule.forFeature([
    {
      name : Person.name,
      schema : personSchema,
      discriminators : [{ name : Vendor.name , schema : vendorSchema}]
    }])],
    controllers : [VendorController],
    providers : [VendorRepository, VendorService],
    exports : [VendorRepository,VendorService],
})
export class VendorModule {}