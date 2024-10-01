

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Types } from "mongoose";
import { UserRepository } from "src/models/user/user.repository";
import * as bcrypt from "bcryptjs"
@Injectable()
export class UserService {
  constructor(private readonly userRepository : UserRepository) {}


    // signUp for user
    async signUp(createUserDTO : {name : string , phone : string , password : string}){
      // check if user exist
      const userExist = await this.userRepository.getOne({ phone : createUserDTO.phone})
      // if exist throw error
      if(userExist) throw new BadRequestException("user already exist")
      // Hash password
      const hashPassword = await bcrypt.hash(createUserDTO.password,10)
      // send response
      return this.userRepository.create({...createUserDTO , password : hashPassword})
    }
     // signIn for user
    async signIn(signInDTO : {phone : string , password : string}){
      // check if user exist
      const user = await this.userRepository.getOne({ phone : signInDTO.phone});
      // if user not found
      if (!user) throw new NotFoundException('User not found');
       // Verify the password
      const passwordValid = await bcrypt.compare(signInDTO.password, user.password);
      // check valid password 
      if (!passwordValid) throw new UnauthorizedException ('Invalid credentials');
      // return user details 
      return { user };
    }
  
    // Get all Users
    async getAllUsers() {
      return await this.userRepository.getAll({});
    }
  
    // Get a User by id
    async getUserById(id: string){
      // find User 
      const user = await this.userRepository.getOne({ _id: new Types.ObjectId(id) });
      // check id User exist
      if(!user) throw new NotFoundException("Not found User");
      // return response
      return {user}
    }
  
    // Update User data by Id
    async updateUser(
      id : string,
      updateUserDTO : {name: string,phone: string,password: string}
    ) {
      // find user
      const user = await this.userRepository.getOne({_id : new Types.ObjectId(id)})
      //if not found user
      if(!user) throw new NotFoundException("User not found")
      // hash password
      const hashPassword = await bcrypt.hash(updateUserDTO.password,8);
      // wrapping data in update variable
      const update = { ...updateUserDTO , password :hashPassword}
      // return response  
      return this.userRepository.update({ _id: new Types.ObjectId(id) },update,{ new: true });
        
    }
  
    // Delete User data by Id
    async deleteUser(id: string): Promise<{message : string}> {
      // use method delete 
      const user = await this.userRepository.delete({ _id: new Types.ObjectId(id) });
      // check if user deleted or not
      if(user.deletedCount == 0) throw new NotFoundException("user not found")
      // send response
      return {message : "Deleted user successfully"}
    }
}