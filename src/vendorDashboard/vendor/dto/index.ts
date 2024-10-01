import { PartialType } from "@nestjs/swagger";

export class CreateVendorDTO{
      name: string;
      phone: string;
      password: string;   
}

export class UpdateVendorDTO extends PartialType(CreateVendorDTO){}

