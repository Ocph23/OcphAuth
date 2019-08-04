import { Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AES ,enc } from 'crypto-ts';

@Injectable()
export class AuthService {

    constructor(
      private readonly jwtService: JwtService, 
      private readonly usersService:UsersService) {}

    async login(data: any) {
      const model = { userName: data.userName, password: data.password };
      if (this.validateUser(data.userName,data.pass)) {
        return { access_token: this.jwtService.sign(model)};
      }
      return null;
    }

    async register(data: any) {
      const model = { username: data.userName, password: data.password };
      const token= this.jwtService.sign(model);
      data.passwordHash= AES.encrypt(model.password, "123456").toString() 
      const result = await this.usersService.insert(data);
      if(result)
         return  true;
      return false;
    }

    async validateUser(username: string, pass: string): Promise<any> {
      const model = { username: username, password: pass };
      const user = await this.usersService.findOne(model);
      if (user && AES.encrypt(user.passwordHash, "123456").toString() === pass) {
        return user;
      }
      return null;
    }

    decript(passwordHash:string):string{
      var bytes  = AES.decrypt(passwordHash, '123456');
      return bytes.toString(enc.Utf8);
    }

  }