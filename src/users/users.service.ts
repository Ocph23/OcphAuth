import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDto } from './users.Dto';
import { Model } from 'mongoose';
import { UsersModel, IUsersModel } from './users.model';
import { AES, enc } from 'crypto-ts';
import { jwtConstants } from '../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UsersDto>,
  ) {}
  async insert(data: any): Promise<UsersDto> {
    try {
      const model = new this.userModel(data);
      model.passwordHash = AES.encrypt(data.password, jwtConstants.passwordSecret).toString();
      return await model.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<IUsersModel[]> {
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

  async updateProfile(user: any): Promise<UsersDto> {
    try {
      const model = new this.userModel(user);
      var result = await this.userModel.findOneAndUpdate({ userName: user.userName }, user);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }




  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const model = { userName: username };
      const user = await this.userModel.findOne(model);
      const password = AES.decrypt(user.passwordHash, jwtConstants.passwordSecret).toString(
        enc.Utf8,
      );
      if (user && password === pass) {
        return user;
      }
      throw Error('You Not Have Access');
    } catch (error) {
      throw Error('You Not Have Access');
    }
  }

  decript(passwordHash: string): string {
    var bytes = AES.decrypt(passwordHash, jwtConstants.passwordSecret);
    return bytes.toString(enc.Utf8);
  }
}
