import { Injectable, BadRequestException, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AES ,enc } from 'crypto-ts';

@Injectable()
export class AuthService {

    constructor(
      private readonly jwtService: JwtService, 
      private readonly usersService:UsersService) {}

    async login(data: any) {
      const user = await this.validateUser(data.userName,data.password);
      if (user) {
        const model={npm:user.npm, userName:user.userName};
        return { access_token: this.jwtService.sign(model)};
      }
      return new UnauthorizedException("Not Have Access");
    }

    async register(data: any) {
      data.passwordHash= AES.encrypt(data.password, "123456").toString() 
      const result = await this.usersService.insert(data);
      if(result)
         return { access_token: this.jwtService.sign({npm:data.npm, userName:data.userName})};;
      return false; 
    }

    async validateUser(username: string, pass: string): Promise<any> {
      const model = { userName: username};
      const user = await this.usersService.findOne(model);
      const password = AES.decrypt(user.passwordHash,"123456").toString(enc.Utf8);
      if (user && password === pass) {
        return user;
      }
      return null;
    }


    async profile(data: any) {
      const model = { id: data.userId, userName: data.userName};
      const user = await this.usersService.findOne(model);
      return user;
    
    }



    decript(passwordHash:string):string{
      var bytes  = AES.decrypt(passwordHash, '123456');
      return bytes.toString(enc.Utf8);
    }

  }