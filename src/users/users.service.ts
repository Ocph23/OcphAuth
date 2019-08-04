import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDto } from "./users.Dto";
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
      @InjectModel('Users') private readonly userModel: Model<UsersDto>) {
    }
    async insert(data:UsersDto):Promise<UsersDto>
    {
      const model = new this.userModel(data as UsersDto);
      return await model.save();
    }
    
    async findAll(): Promise<UsersDto[]> {
      return await this.userModel.find().exec();
    }

    async findOne(param:any):Promise<UsersDto>{
     const data= await this.userModel.findOne(param).exec();
     return data;
    }



}
