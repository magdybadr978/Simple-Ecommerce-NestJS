import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price : number;

  @ApiProperty()
  @IsMongoId()
  vendorId: Types.ObjectId;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
