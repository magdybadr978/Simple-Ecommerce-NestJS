import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { CreateVendorDTO, UpdateVendorDTO } from "./dto";


@Controller('dashboard-vendor/vendor')
export class VendorController{
  constructor(private readonly vendorService :VendorService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createVendor(
    @Body()
    createVendorDTO: CreateVendorDTO
  ) {
    return await this.vendorService.createVendor(createVendorDTO);
  }

  @Get()
  async getAllVendors() {
    return await this.vendorService.getAllVendors();
  }

  @Get(':id')
  async getSpecificVendor(@Param('id') id: string) {
    return await this.vendorService.getVendorById(id);
  }

  @Put(':id')
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
  async deleteVendor(@Param('id') id: string) {
    return await this.vendorService.deleteVendor(id);
  }
}