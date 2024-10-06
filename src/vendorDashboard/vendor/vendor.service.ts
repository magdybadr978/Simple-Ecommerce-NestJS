import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { CreateResponse, DeleteResponse, GetAllResponse, GetOneResponse, UpdateResponse } from 'src/common/dto/response.dto';
import { VendorRepository } from 'src/models/vendor/vendor.repository';
import { Vendor, VendorDocument } from 'src/models/vendor/vendor.schema';
import { CreateVendorDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class VendorService {
  constructor(private readonly vendorRepository: VendorRepository ,
              private readonly jwtService : JwtService) {}

  // Create a new Vendor
  async createVendor(createVendorDTO: CreateVendorDTO): Promise<CreateResponse<Vendor>> {
    // check if phone exist
    const user = await this.vendorRepository.getOne({
      phone: createVendorDTO.phone,
    });
    // failed
    if (user) throw new ConflictException('phone already exist');
    // hash password
    createVendorDTO.password = await bcrypt.hash(createVendorDTO.password, 10);
    // add to database
    const createdVendor = await this.vendorRepository.create(createVendorDTO) as VendorDocument;
    // send response
    return {success : true , data : createdVendor};
  }

  // Get all vendors
  async getAllVendors(): Promise<GetAllResponse<Vendor>>{
    const vendors = await this.vendorRepository.getAll({});
    return {success : true , data : vendors}
  }

  // Get a vendor by id
  async getVendorById(id: string):Promise<GetOneResponse<Vendor>> {
    // find Vendor
    const vendor = await this.vendorRepository.getOne({
      _id: new Types.ObjectId(id),
    });
    // check id vendor exist
    if (!vendor) throw new NotFoundException('vendor not found');
    // return response
    return {success : true , data : vendor};
  }

  // Update vendor data by Id
  async updatevendor(
    id: string,
    updateVendorDTO: { name?: string; phone?: string; password?: string },
  ):Promise<UpdateResponse<Vendor>> {
    // check if vendor exist
    const vendor = await this.vendorRepository.getById(id);
    // failed
    if (!vendor) throw new NotFoundException('vendor not found');
    // check if phone exist
    const phoneExist = await this.vendorRepository.getOne({phone :updateVendorDTO.phone , _id : {$ne : id}});
    // failed
    if(phoneExist) throw new ConflictException("phone already exist");
    // send response
    const updatedVendor = await this.vendorRepository.update(  { _id: new Types.ObjectId(id) },updateVendorDTO,{ new: true ,lean : true}) as unknown as VendorDocument;
    return {success : true , data: updatedVendor}
  }

  // Delete Vendor data by Id
  async deleteVendor(id: string): Promise<DeleteResponse> {
    // use method delete
    const vendor = await this.vendorRepository.delete({
      _id: new Types.ObjectId(id),
    });
    // check if vendor deleted or not
    if (vendor.deletedCount == 0)
      throw new NotFoundException('vendor not found');
    // send response
    return {success : true};
  }
}
