import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AES, enc } from 'crypto-ts';
import { jwtConstants } from '../constants';
import { IDeveloperModel, IUserApplication } from './developer.model';
import { UsersService } from '../users/users.service';
import { DeveleporDTO, AppDTO } from './developer.dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel('Developers') private readonly developerModel: Model<DeveleporDTO>,
    @InjectModel('Apps') private readonly appModel: Model<AppDTO>,
    private readonly userService:UsersService
  ) {}
  async register(user: any, data:IDeveloperModel ): Promise<DeveleporDTO> {
    try {
      data.createDate= new Date();
      data.userId=user.id;
      const model = new this.developerModel(data);
      await model.save();
      var usermodel = await this.userService.findOne({_id:user.id});
      if(usermodel)
      {
        usermodel.roles.push("Developer");
        usermodel.save();
      }
      return model;
    } catch (error) {
      if(error.code===11000)
          throw new Error("Anda Telah Terdaftar Sebagai Developer");
      throw new Error(error.message);
    }
  }

  async addNewApp(userId:string, data:AppDTO){
    try {
      var dataFound = await this.developerModel.findOne({userId:userId});
      //data._id=new ObjectId();
      data.appKey=this.generateappKey(data.appName);
      data.userId = userId;
      const newObj = new  this.appModel(data);
      if(dataFound){
       // dataFound.apps.push(newObj);
        return await dataFound.save();
      }
      throw new Error("anda belum terdaftar sebagai developer");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllApps(userId:string): Promise<IUserApplication[]> {
    try {
      var dataFound = await this.findOne({userId:userId});
      if(dataFound)
      {
        return dataFound.apps;
      }
      throw new Error("anda belum terdaftar sebagai developer");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
  async findOneApp(userId:string,param: any): Promise<IUserApplication> {
    try {
      const data = await this.appModel.findById(param);
      // this.developerModel.apps.find({apps}).exec();
      //var result =data.apps.find(x=>x._id===param);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
  async updateOneApp(userId:string, param:any): Promise<boolean> {
    try {
      var data = await this.appModel.findById(param);
      data=param;
      await data.save();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

 private async findOne(param: any): Promise<DeveleporDTO> {
    try {
      const data = await this.developerModel.findOne(param).exec();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateOne(user: any): Promise<DeveleporDTO> {
    try {
      const model = new this.developerModel(user);
      var result = await this.developerModel.findOneAndUpdate({ userName: user.userName }, user);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  
  async GenerateNewAppKey(userId:string, param:any): Promise<string> {
    try {
      var data = await this.findOne({userId:userId});
      var result =data.apps.find(x=>x===param);
     // result.appKey=this.generateappKey(result.appName);
      await data.save();
      return null;//result.appKey;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  private generateappKey(appName: string): string {
    return AES.encrypt(appName, jwtConstants.passwordSecret).toString();
  }
}

