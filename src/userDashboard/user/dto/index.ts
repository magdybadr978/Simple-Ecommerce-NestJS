import { PartialType } from "@nestjs/swagger";

export class CreateUserDTO{
      name: string;
      phone: string;
      password: string;   
}

export class UpdateUserDTO extends PartialType(CreateUserDTO){}

