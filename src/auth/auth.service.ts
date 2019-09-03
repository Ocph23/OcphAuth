import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AES, enc } from 'crypto-ts';
import { UsersModel } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: any) {
    try {
      const data = await this.validateUser(user.userName, user.password);
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
              user.identityNumber,
              user.role,
            );
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

  getStudentProfile(identityNumber: string, typeProfile: string): any {
    try {
      return {
        type: typeProfile,
        NPM: '201511099',
        Angkata: 2015,
        Nama: 'Yoseph Kungkung',
        TempatLahir: 'Palopo',
        TanggalLahir: new Date(),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(user: UsersModel) {
    try {
      user.userName = user.email;
      user.roles = [];
      user.profiles=[];
      if (user.role) {
        switch (user.role) {
          case 'Student':
            const profileStudent = this.getStudentProfile(
              user.identityNumber,
              user.role,
            );
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
          case 'Guest':
            user.roles.push(user.role);
            break;
          default:
            const profile = this.getProfile(user.identityNumber, user.role);
            user.profiles.push(profile);
            user.roles.push(user.role);
            break;
        }

        const result = await this.usersService.insert(user);
        if (result)
          return {
            access_token: this.jwtService.sign({
              identityNumber: result.identityNumber,
              firstName: result.firstName,
              email: result.email,
              roles: result.roles,
              id: result.id,
              userName: result.userName,
            }),
          };
        return false;
      } else throw 'Select a Role';
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const model = { userName: username };
      const user = await this.usersService.findOne(model);
      const password = AES.decrypt(user.passwordHash, '123456').toString(
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

  async profile(data: any) {
    const model = { id: data.userId, userName: data.userName };
    const user = await this.usersService.findOne(model);
    return user;
  }

  decript(passwordHash: string): string {
    var bytes = AES.decrypt(passwordHash, '123456');
    return bytes.toString(enc.Utf8);
  }
}
