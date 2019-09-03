import {
  Controller,
  Request,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('developer')
export class DeveloperController {
  constructor(private readonly service: DeveloperService) {}

  @Post('create')
  async create(@Body() model: any) {
    try {
      return await this.service.register(model);
    } catch (ex) {
      throw new HttpException(ex.errmsg, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() req: any) {
    return this.service.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return this.service.profile(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('IsLoged')
  getLoged(@Request() req) {
    return true;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('createapp')
  async createapp(@Request() req) {
    try {
      const model = req.body;
      return await this.service.createapp(req.user, model);
    } catch (ex) {
      throw new HttpException(ex.errmsg, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('newpppkey:id')
  async newAppKey(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }
}
