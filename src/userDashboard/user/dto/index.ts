import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsPhoneNumber('EG')
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  role : string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}

export class SignInDTO extends PartialType(CreateUserDTO) {}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
