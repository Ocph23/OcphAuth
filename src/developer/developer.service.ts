import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeveloperDto } from './developer.Dto';
import { Model } from 'mongoose';
import { AES, enc } from 'crypto-ts';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DeveloperService {
  generateNewAppKey(user: any, appid: any) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Developers') private readonly userModel: Model<DeveloperDto>,
  ) { }

  async insert(data: DeveloperDto): Promise<DeveloperDto> {
    const model = new this.userModel(data as DeveloperDto);
    return await model.save();
  }

  async createapp(user: any, data: any) {
    const model = { _id: user.id };
    const userFound = await this.userModel.findOne(model).exec();
    if (userFound) {
      const dataModel = new this.userModel(userFound as DeveloperDto);
      data.appKey = AES.encrypt(data.name, 'appKeySuper').toString();
      dataModel.apps.push(data);
      if (await dataModel.update({ _id: dataModel.id, dataModel })) return data;
      return null;
    }
  }

  async profile(data: any) {
    const model = { userName: data.userName };
    const user = await this.userModel.findOne(model).exec();
    return user;
  }

  async login(data: any) {
    const user = await this.validateUser(data.userName, data.password);
    if (user) {
      const model = { id: user.id, userName: user.userName };
      return { access_token: this.jwtService.sign(model) };
    }
    return new UnauthorizedException('Not Have Access');
  }

  async register(data: any) {
    try {
      data.passwordHash = AES.encrypt(data.password, 'appKeySuper').toString();
      const result = await this.insert(data);
      if (result)
        return {
          access_token: this.jwtService.sign({
            Id: result.id,
            userName: result.userName,
          }),
        };
      throw new Error('Registrasi gagal');
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateUser(username: string, pass: string): Promise<DeveloperDto> {
    const model = { userName: username };
    const user = await this.userModel.findOne(model).exec();
    const password = AES.decrypt(user.passwordHash, 'appKeySuper').toString(
      enc.Utf8,
    );
    if (user && password === pass) {
      return user;
    }
    return null;
  }
}
