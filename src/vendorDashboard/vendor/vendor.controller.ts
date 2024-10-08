import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { CreateVendorDTO, SignInDTO, UpdateVendorDTO } from "./dto";
import { AuthGuard } from "src/Guards/Authentication";
import { RolesGuard } from "src/Guards/Authorization";
import { Roles } from "src/common/Guards/roles.decorator";
import { request } from "http";


@Controller('dashboard-vendor/vendor')
export class VendorController{
  constructor(private readonly vendorService :VendorService) {}

  @Post('/signUp')
  @UsePipes(ValidationPipe)
  async createVendor(
    @Body()
    createVendorDTO: CreateVendorDTO
  ) {
    return await this.vendorService.signup(createVendorDTO);
  }

  @Post('/signIn')
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInDTO : SignInDTO){
    return await this.vendorService.signIn(signInDTO);
  }


  @Get()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Vendor')
  async getAllVendors() {
    return await this.vendorService.getAllVendors();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSpecificVendor(@Param('id') id: string) {
    return await this.vendorService.getVendorById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Vendor')
  @UsePipes(ValidationPipe)
  async updateVendor(
    @Param('id') id: string,
    @Body()
    updateVendorDTO: UpdateVendorDTO,@Req() request : any
  ) {
    return this.vendorService.updatevendor(
      id,
      updateVendorDTO,
      request
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Vendor')
  async deleteVendor(@Param('id') id: string , @Req() request : any)  {
    return await this.vendorService.deleteVendor(id, request);
  }
}