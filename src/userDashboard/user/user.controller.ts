import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, SignInDTO, UpdateUserDTO } from './dto';
import { AuthGuard } from 'src/Guards/Authentication';

@Controller('dashboard-user/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDTO : CreateUserDTO){
    return await this.userService.signUp(createUserDTO)
  }

 @Post("signIn")
 @UsePipes(ValidationPipe)
 async signIn(@Body() signInDTO : SignInDTO){
  return this.userService.signIn(signInDTO)
 }

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSpecificUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
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
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
