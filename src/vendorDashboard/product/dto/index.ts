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


// for order
export class ProductDTO {
  @ApiProperty()
  @IsMongoId()
  productId: Types.ObjectId; // Instead of vendorId, use productId for the order

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
