import {
  Controller,
  Post,
  Request,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  async create(@Body() model: any) {
    try {
      return await this.authService.register(model);
    } catch (ex) {
      throw new HttpException(ex.errmsg, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('developer')
  async asDeveloper(@Request() req: any) {
    try {
      if (req.user && req.user.id != null)
        return this.authService.registerAsDeveloper(req.user.userName);
      throw new HttpException(
        'profile anda tidak ditemukan',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (ex) {
      throw new HttpException(ex.errmsg, HttpStatus.BAD_REQUEST);
    }
  }
}
