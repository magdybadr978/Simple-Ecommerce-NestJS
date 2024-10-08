

import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException, Req, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { CreateResponse, DeleteResponse, GetAllResponse, GetOneResponse, UpdateResponse } from "src/common/dto/response.dto";
import { UserRepository } from "src/models/user/user.repository";
import { User, UserDocument } from "src/models/user/user.schema";
import { CreateUserDTO, SignInDTO, UpdateUserDTO } from "./dto";
@Injectable()
export class UserService {
  constructor(private readonly userRepository : UserRepository , private readonly jwtService : JwtService) {}


    // signUp for user
    async signUp(createUserDTO : CreateUserDTO): Promise<CreateResponse<User>>{
      // check if user exist
      const userExist = await this.userRepository.getOne({ phone : createUserDTO.phone}) 
      // if exist throw error
      if(userExist) throw new BadRequestException("user already exist")
      // Hash password
      const hashPassword = await bcrypt.hash(createUserDTO.password,+process.env.SALT_ROUND)
      // make variable to add user 
      const user = await this.userRepository.create({...createUserDTO , password : hashPassword})as unknown as  UserDocument
      // send response
      return {success : true , data : user}
    }
     // signIn for user
    async signIn(signInDTO : SignInDTO): Promise<CreateResponse<User>>{
      // check if user exist
      const user = await this.userRepository.getOne({ phone : signInDTO.phone});
      // if user not found
      if (!user) throw new NotFoundException('User not found');
       // Verify the password
      const passwordValid = await bcrypt.compare(signInDTO.password, user.password);
      // check valid password 
      if (!passwordValid) throw new UnauthorizedException ('Invalid credentials');
      // use token
       const token =  this.jwtService.sign({ id : user._id ,role : user.role ,phone : user.phone},{secret: process.env.TOKEN_SIGNATURE})as unknown as UserDocument
      // return user details 
      return { success : true , data : token };
    }
  
    // Get all Users
    async getAllUsers(): Promise<GetAllResponse<User>> {
      // use method getAll
      const users = await this.userRepository.getAll({});
      // failed
      if(users.length == 0) throw new NotFoundException("not found users")
      return {success : true , data : users}
    }
  
    // Get a User by id
    async getUserById(id: string ,request : any):Promise<GetOneResponse<User>>{
      // find User 
      const userExist = await this.userRepository.getOne({ _id: new Types.ObjectId(id) });
      // check id User exist
      if(!userExist) throw new NotFoundException("Not found User");
      // return response
      return { success : true , data : userExist}
    }

    // get my Profile
    async getMyProfile(request : any):Promise<GetOneResponse<User>>{
      // get data from request
      const user = request.user;
      console.log(user.id);
      
      // check if user not exist
      const userExist = await this.userRepository.getOne({_id : new Types.ObjectId(user.id)})
      //failed
      if(!userExist) throw new NotFoundException("user not exist")
      // send response
      return {success : true , data : userExist}
    }
  
    // Update User data by Id
    async updateUser(id : string,updateUserDTO : UpdateUserDTO , request : any):Promise<UpdateResponse<User>> {
      // get user from request
      const user = request.user;
      // find user
      const userExist = await this.userRepository.getOne({_id : new Types.ObjectId(id)})
      //if not found user
      if(!userExist) throw new NotFoundException("User not found")
      // check this is the valid user
      if(!new Types.ObjectId(id).equals( new Types.ObjectId(user.id))){
        throw new ForbiddenException("not authorizied to update")
      }
      // hash password
      const hashPassword = await bcrypt.hash(updateUserDTO.password,8);
      // wrapping data in update variable
      const update = { ...updateUserDTO , password :hashPassword}
      // create variable to add updated data
      const updatedUser = await this.userRepository.update({ _id: new Types.ObjectId(id) },update,{ new: true ,lean : true }) as unknown as  UserDocument;
      // return response  
      return { success : true , data : updatedUser}
        
    }
  
    // Delete User data by Id
    async deleteUser(id: string ,request : any ): Promise<DeleteResponse> {
      // get data from request
      const user = request.user;
      // check if this is the valid user  
      if(!new Types.ObjectId(id).equals(new Types.ObjectId(user.id))){
        throw new ForbiddenException("not authorizied")
      }
        // use method delete 
        const userExist = await this.userRepository.delete({ _id: new Types.ObjectId(id) });
        // check if user deleted or not
        if(userExist.deletedCount == 0) throw new NotFoundException("user not found")
      // send response
      return {success : true}
    }
}