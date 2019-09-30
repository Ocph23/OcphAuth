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
	Put
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { OcphRoleGuard, OcphGuard } from '../guards/ocphGuard.guard';

@Controller('api/developer')
export class DeveloperController {
	constructor(private readonly devService: DeveloperService) {}

	@UseGuards(OcphRoleGuard([ 'Developer' ]))
	@Get()
	get(@Request() req) {
		if (req.user) return this.devService.findAllApps(req.user);
	}

	@UseGuards(OcphGuard())
	@Post('register')
	registyer(@Request() req) {
		if (req.body) return this.devService.register(req.user, req.body);
	}

	//appps
	@UseGuards(OcphRoleGuard([ 'Developer' ]))
	@Post('createapp')
	createapp(@Request() req) {
		
		try {
			if (req.body) return this.devService.addNewApp(req.user.id, req.body);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(OcphRoleGuard([ 'Developer' ]))
	@Get('apps')
	getApps(@Request() req) {
		if (req.user) return this.devService.findAllApps(req.user.id);
	}

	@UseGuards(OcphRoleGuard([ 'Developer' ]))
	@Get('app/:id')
	getApp(@Request() req) {
		try {
			if (req.user) 
			return this.devService.findOneApp(req.user.id, req.params.id);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(OcphRoleGuard([ 'Developer' ]))
	@Get('newappkey/:id')
	getnewkeyApp(@Request() req) {
		try {
			if (req.user) {
				return this.devService.GenerateNewAppKey(req.user.id, req.params.id);
			}
			throw new HttpException('Anda Tidak Memiliki Akses', HttpStatus.UNAUTHORIZED);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
