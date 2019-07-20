import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Controller('auth')
export class LoginController {
    constructor(private readonly authService: AuthService,
        ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
      return req.user;
    }
}