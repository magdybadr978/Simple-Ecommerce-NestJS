import { PartialType } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";


export class CreateVendorDTO {
  @ApiProperty()
  @IsString()
  name : string;

  @ApiProperty()
  @IsPhoneNumber('EG')   // allow only egyptian phone numbers
  phone : string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  role : string;

  @ApiProperty()
  @IsStrongPassword({
    minLength : 8,
    minLowercase : 1,
    minNumbers : 1,
    minSymbols : 1,
    minUppercase : 1
  })
  password : string
}

export class SignInDTO extends PartialType(CreateVendorDTO) {}

export class UpdateVendorDTO extends PartialType(CreateVendorDTO){}

