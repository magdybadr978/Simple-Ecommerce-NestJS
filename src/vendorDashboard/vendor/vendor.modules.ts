import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "src/models/common/user.schema";

import { Vendor, vendorSchema } from "src/models/vendor/vendor.schema";

@Module({
  imports: [ MongooseModule.forFeature([
    {
      name : User.name,
      schema : userSchema,
      discriminators : [{ name : Vendor.name , schema : vendorSchema}]
    }])],
    controllers : [],
    providers : [],
    exports : [],
})
export class VendorModule {}