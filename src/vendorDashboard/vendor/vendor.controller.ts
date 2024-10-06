import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { CreateVendorDTO, UpdateVendorDTO } from "./dto";
import { AuthGuard } from "src/Guards/Authentication";


@Controller('dashboard-vendor/vendor')
export class VendorController{
  constructor(private readonly vendorService :VendorService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async createVendor(
    @Body()
    createVendorDTO: CreateVendorDTO
  ) {
    return await this.vendorService.createVendor(createVendorDTO);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllVendors() {
    return await this.vendorService.getAllVendors();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSpecificVendor(@Param('id') id: string) {
    return await this.vendorService.getVendorById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async updateVendor(
    @Param('id') id: string,
    @Body()
    updateVendorDTO: UpdateVendorDTO
  ) {
    return this.vendorService.updatevendor(
      id,
      updateVendorDTO
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteVendor(@Param('id') id: string) {
    return await this.vendorService.deleteVendor(id);
  }
}