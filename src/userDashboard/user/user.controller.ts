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
import { RolesGuard } from 'src/Guards/Authorization';
import { Roles } from 'src/common/Guards/roles.decorator';

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
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('User')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('User')
  async getSpecificUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('User')
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
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('User')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
