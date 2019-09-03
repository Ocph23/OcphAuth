import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Render,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UsersModel } from '../../users/users.model';

@Controller('auth')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
  @Post('login')
  async login(@Body() req: UsersModel) {
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    if (req.user && req.user.id != null)
      return this.authService.profile(req.user);
    throw new HttpException(
      'profile anda tidak ditemukan',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  putProfile(@Request() req) {
    if (req.user && req.user.id != null)
      return this.authService.putprofile(req.body);
    throw new HttpException(
      'profile anda tidak ditemukan',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('IsLoged')
  getLoged(@Request() req) {
    return true;
  }
}
