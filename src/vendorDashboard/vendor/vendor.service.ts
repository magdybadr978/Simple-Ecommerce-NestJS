import { Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { VendorRepository } from "src/models/vendor/vendor.repository";
import { Vendor } from "src/models/vendor/vendor.schema";

@Injectable()
export class VendorService {
  constructor(private readonly vendorRepository : VendorRepository) {}

    // Create a new Vendor
    async createVendor(createVendorDTO: {
      name: string,
      phone: string,
      password: string,
    }){
      return this.vendorRepository.create(createVendorDTO);
    }
  
    // Get all vendors
    async getAllVendors() {
      return await this.vendorRepository.getAll({});
    }
  
    // Get a vendor by id
    async getVendorById(id: string){
      // find Vendor 
      const vendor = await this.vendorRepository.getOne({ _id: new Types.ObjectId(id) });
      // check id vendor exist
      if(!vendor) throw new NotFoundException("Not found Vendor");
      // return response
      return {vendor}
    }
  
    // Update vendor data by Id
    async updatevendor(
      id : string,
      updateVendorDTO : {name: string,phone: string,password: string}
    ) {
      return this.vendorRepository.update(
        { _id: new Types.ObjectId(id) },
        updateVendorDTO,
        { new: true },
      );
    }
  
    // Delete Vendor data by Id
    async deleteVendor(id: string): Promise<{message : string}> {
      // use method delete 
      const vendor = await this.vendorRepository.delete({ _id: new Types.ObjectId(id) });
      // check if vendor deleted or not
      if(vendor.deletedCount == 0) throw new NotFoundException("vendor not found")
      // send response
      return {message : "Deleted vendor successfully"}
    }
}