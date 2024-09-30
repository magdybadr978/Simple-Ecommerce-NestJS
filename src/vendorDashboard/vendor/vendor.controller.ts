import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";


@Controller('dashboard-vendor')
export class VendorController{
  constructor(private readonly vendorService :VendorController) {}

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
    return await this.vendorService.getSpecificVendor(id);
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
    return this.vendorService.updateVendor(
      id,
      updateVendorDTO
    );
  }

  @Delete('delete/:id')
  async deleteService(@Param('id') id: string) {
    return await this.vendorService.deleteService(id);
  }
}