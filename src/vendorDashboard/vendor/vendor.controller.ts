import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { VendorService } from "./vendor.service";


@Controller('dashboard-vendor')
export class VendorController{
  constructor(private readonly vendorService :VendorService) {}

  @Post('add')
  async createVendor(
    @Body()
    createVendorDTO: {
      name: string;
      phone: string;
      password: string;
    },
  ) {
    return await this.vendorService.createVendor(createVendorDTO);
  }

  @Get('getAll')
  async getAllVendors() {
    return await this.vendorService.getAllVendors();
  }

  @Get('getSpecific/:id')
  async getSpecificVendor(@Param('id') id: string) {
    return await this.vendorService.getVendorById(id);
  }

  @Put('update/:id')
  async updateVendor(
    @Param('id') id: string,
    @Body()
    updateVendorDTO: {
      name: string;
      phone: string;
      password: string;
    },
  ) {
    return this.vendorService.updatevendor(
      id,
      updateVendorDTO
    );
  }

  @Delete('delete/:id')
  async deleteVendor(@Param('id') id: string) {
    return await this.vendorService.deleteVendor(id);
  }
}