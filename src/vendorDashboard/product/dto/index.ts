import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsAlphanumeric, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsMongoId()
  vendorId: Types.ObjectId;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
