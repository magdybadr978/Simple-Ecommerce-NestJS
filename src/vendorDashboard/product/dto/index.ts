import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  price : number;

  @ApiProperty()
  @IsMongoId()
  vendorId: Types.ObjectId;
}


export class ProductInfoDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Product ID must be a valid Mongo ID' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: Types.ObjectId;

  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
