import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CartItemDTO {
  @ApiProperty({ type: String })
  @IsMongoId()
  productId: Types.ObjectId;

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;
}

export class CreateCartDTO {
  @ApiProperty({ type: String })
  @IsMongoId()
  userId: Types.ObjectId;

  @ApiProperty({ type: '[CartItemDTO]' })
  items: CartItemDTO[];
}

export class UpdateCartDTO extends PartialType(CreateCartDTO) {}
