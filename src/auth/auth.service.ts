import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  HttpService,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AES, enc } from 'crypto-ts';
import { UsersModel, IUsersModel } from '../users/users.model';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly http:HttpService
  ) {}

  async login(user: any) {
    try {
      const data = await this.usersService.validateUser(user.userName, user.password);
      if (data) {
        return {
          access_token: this.jwtService.sign({
            identityNumber: data.identityNumber,
            firstName: data.firstName,
            email: data.email,
            id: data.id,
            userName: data.userName,
            roles: data.roles,
          }),
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

   async registerAsDeveloper(data: string) {
    try {
      const model = { userName: data};
      const user:UsersModel = await this.usersService.findOne(model);
      if(user)
      {
        user.role="Developer";
        const result =await this.putprofile(user);
        return result;
      }
      throw new Error("anda tidak memiliki akses");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async putprofile(user: UsersModel) {
    try {
      if (user.role !== 'Guest' && user.roles.indexOf('Guest') !== -1) {
        const index = user.roles.indexOf('Guest');
        user.roles.splice(index, 1);
      }

      const role = user.roles.find(x => x == user.role);
      if (!role && user.role) {
        switch (user.role) {
          case 'Student':
            const profileStudent = this.getStudentProfile(
              user.identityNumber);
            user.profiles.push(profileStudent);
            user.roles.push(user.role);
            break;
          case 'Teacher':
            const profileTeacher = this.getProfileTeacher(
              user.identityNumber,
              user.role,
            );
            user.profiles.push(profileTeacher);
            user.roles.push(user.role);
            break;
          default:
            const profile = this.getProfile(user.identityNumber, user.role);

            user.profiles.push(profile);
            user.roles.push(user.role);
            break;
        }

        const result = await this.usersService.updateProfile(user);
        return result;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  getProfile(identityNumber: string, role: string) {
    try {
      return {
        type: role,
        firstName: '',
        lastName: '',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  getProfileTeacher(identityNumber: string, typeProfile: string): any {
    try {
      return {
        type: typeProfile,
        NIDN: '20150022252525',
        TahunMasuk: 2015,
        Nama: 'Ajenk Kungkung',
        TempatLahir: 'Makassar',
        TanggalLahir: new Date(),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getStudentProfile(identityNumber: string): Promise<any> {
    try {
     var result = await this.http.get("http://restsimak.stimiksepnop.ac.id/api/Mahasiswa/GetDataMahasiswa?npm="+identityNumber)
      .toPromise();
      return result.data;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(user: UsersModel) {
    try {
      user.userName = user.email;
      user.email = user.email.toLocaleLowerCase();
      user.roles = [];
      if (user.role) {
        switch (user.role) {
          case 'Student':
            // const profileStudent = this.getStudentProfile(user.identityNumber);
            // user.profiles.push(profileStudent);
            user.roles.push(user.role);
            break;
          case 'Teacher':
            const profileTeacher = this.getProfileTeacher(
              user.identityNumber,
              user.role,
            );
            user.profiles.push(profileTeacher);
            user.roles.push(user.role);
            break;
          case 'Guest':
            user.roles.push(user.role);
            break;
          default:
            const profile = this.getProfile(user.identityNumber, user.role);
            user.profiles.push(profile);
            user.roles.push(user.role);
            break;
        }

        const data = await this.usersService.insert(user);
        if (data)
          return {
            access_token: this.jwtService.sign({
              identityNumber: data.identityNumber,
              firstName: data.firstName,
              email: data.email,
              id: data.id,
              userName: data.userName,
              roles: data.roles,
            }),
          };
        return false;
      } else throw 'Select a Role';
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

 

  async profile(data: any) {
    const model = { id: data.userId, userName: data.userName };
    const user = await this.usersService.findOne(model);
    var res = await this.getStudentProfile(user.identityNumber);
    var result = res.data[0];
    return result;
  }

  
}
