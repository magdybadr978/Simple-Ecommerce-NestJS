import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';

@Controller('dashboard-user/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUp(@Body() createUserDTO : CreateUserDTO){
    return await this.userService.signUp(createUserDTO)
  }

 @Post("signIn")
 async signIn(@Body() signInDTO : CreateUserDTO){
  return this.userService.signIn(signInDTO)
 }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getSpecificUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    updateUserDTO: UpdateUserDTO
  ) {
    return this.userService.updateUser(
      id,
      updateUserDTO
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
