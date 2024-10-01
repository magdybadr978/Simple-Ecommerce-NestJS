import { PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateProductDTO {
  name: string;
  description: string;
  vendorId: Types.ObjectId;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
