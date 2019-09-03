import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDto } from './users.Dto';
import { Model } from 'mongoose';
import { UsersModel } from './users.model';
import { AES, enc } from 'crypto-ts';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UsersDto>,
  ) {}
  async insert(data: UsersModel): Promise<UsersDto> {
    try {
      const model = new this.userModel(data);
      model.passwordHash = AES.encrypt(data.password, '123456').toString();
      return await model.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<UsersDto[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(param: any): Promise<UsersDto> {
    try {
      const data = await this.userModel.findOne(param).exec();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProfile(user: UsersModel): Promise<UsersModel> {
    try {
      await this.userModel.findOneAndUpdate({ id: user.id }, user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
