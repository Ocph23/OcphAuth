import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly authService:AuthService
  ) {}


  @Post('create')
  async create(@Body() model: any) {
    try {
      return await this.authService.register(model);
    } catch (ex) {
      throw new HttpException(ex.errmsg, HttpStatus.BAD_REQUEST);
    }
  }

}
