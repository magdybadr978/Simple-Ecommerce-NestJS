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

@Controller('dashboard-user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUp(@Body() createUserDTO :{ name : string ,phone : string , password : string}){
    return this.userService.signUp(createUserDTO)
  }

 @Post("signIn")
 async signIn(@Body() signInDTO : {name : string , phone : string , password : string}){
  return this.userService.signIn(signInDTO)
 }

  @Get('getAll')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('getSpecific/:id')
  async getSpecificUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    updateUserDTO: {
      name: string;
      phone: string;
      password: string;
    },
  ) {
    return this.userService.updateUser(
      id,
      updateUserDTO
    );
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
