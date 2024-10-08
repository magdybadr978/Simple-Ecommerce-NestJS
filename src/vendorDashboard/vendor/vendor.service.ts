import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { CreateResponse, DeleteResponse, GetAllResponse, GetOneResponse, UpdateResponse } from 'src/common/dto/response.dto';
import { VendorRepository } from 'src/models/vendor/vendor.repository';
import { Vendor, VendorDocument } from 'src/models/vendor/vendor.schema';
import { CreateVendorDTO, SignInDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class VendorService {
  constructor(private readonly vendorRepository: VendorRepository ,
              private readonly jwtService : JwtService) {}

  // sign up as a Vendor
  async signup(createVendorDTO: CreateVendorDTO): Promise<CreateResponse<Vendor>> {
    // check if phone exist
    const user = await this.vendorRepository.getOne({
      phone: createVendorDTO.phone,
    });
    // failed
    if (user) throw new ConflictException('phone already exist');
    // hash password
    createVendorDTO.password = await bcrypt.hash(createVendorDTO.password,+process.env.SALT_ROUND);   
    // add to database
    const createdVendor = await this.vendorRepository.create(createVendorDTO) as VendorDocument;
    // send response
    return {success : true , data : createdVendor};
  }
   // sign in as a vendor
  async signIn(signInDTO : SignInDTO) : Promise<CreateResponse<Vendor>>{
    // check if vendor exist
    const vendorExist = await this.vendorRepository.getOne({phone : signInDTO.phone})
    // failed
    if(!vendorExist) throw new NotFoundException("user not exist")
    //verify password
    const validPassword = await bcrypt.compare(signInDTO.password , vendorExist.password)
    //check valid password
    if(!validPassword) throw new UnauthorizedException("Invalid credentials")
    // use token
    const token = this.jwtService.sign({id : vendorExist._id , phone : vendorExist.phone , role : vendorExist.role},{secret : process.env.TOKEN_SIGNATURE})as unknown as VendorDocument
    // send response
    return { success : true , data : token}
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
    updateVendorDTO: { name?: string; phone?: string; password?: string },request : any
  ):Promise<UpdateResponse<Vendor>> {
    // get data from request
    const user = request.user;
    // check if vendor exist
    const vendor = await this.vendorRepository.getById(id);
    // failed
    if (!vendor) throw new NotFoundException('vendor not found');
    // check if this is the valid vendor
    if(! new Types.ObjectId(id).equals( new Types.ObjectId(user.id))){
      throw new ForbiddenException("not authorizied")
    }
    // check if phone exist
    const phoneExist = await this.vendorRepository.getOne({phone :updateVendorDTO.phone , _id : {$ne : id}});
    // failed
    if(phoneExist) throw new ConflictException("phone already exist");
    // hash new password
    const hashPassword = await bcrypt.hash(updateVendorDTO.password , +process.env.SALT_ROUND)
    // wrapping data in variable update
    const update ={... updateVendorDTO , password : hashPassword}
    // update vendor
    const updatedVendor = await this.vendorRepository.update(  { _id: new Types.ObjectId(id) },update,{ new: true ,lean : true}) as unknown as VendorDocument;
    // send response
    return {success : true , data: updatedVendor}
  }

  // Delete Vendor data by Id
  async deleteVendor(id: string , request : any): Promise<DeleteResponse> {
    // get data from request
    const user = request.user;
    // check if this is the valid vendor
    if(!new Types.ObjectId(id).equals(new Types.ObjectId(user.id))){
       throw new ForbiddenException("not authorizied")
    }
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
