import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Controller('auth')
export class LoginController {
    constructor(private readonly authService: AuthService,
        ) {}

    @Post('login')
    async login(@Body() req:any) {
        return this.authService.login(req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return this.authService.profile(req.user);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('IsLoged')
    getLoged(@Request() req) {
        return true;
    }
}