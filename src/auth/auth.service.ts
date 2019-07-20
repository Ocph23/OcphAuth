import { Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
      private readonly jwtService: JwtService, 
      private readonly usersService:UsersService) {}

    async login(data: any) {
      const model = { username: data.username, password: data.password };

      const user = await this.usersService.findOne(model.username);

      const token= this.jwtService.sign(model);

      const passwordHash =token.split('.')[1];
      if (user && user.passwordHash === passwordHash) {
        return { access_token: token};
      }
      return null;
    }

    async register(model: any) {
      const result = await this.usersService.insert(model);
      if(result)
         return  true;
      return false;
    }



    async validateUser(username: string, pass: string): Promise<any> {
      const model = { username: username, password: pass };

      const user = await this.usersService.findOne(model.username);

      const token= this.jwtService.sign(model);

      const passwordHash =token.split('.')[1];
      if (user && user.passwordHash === passwordHash) {
        return user;
      }
      return null;
    }
  

}
