import { Module, HttpService, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeveloperController } from './developer/developer.controller';
import { DeveloperService } from './developer/developer.service';
import { UsersSchema } from './users/users.schema';
import { DeveloperSchema, AppSchema } from './developer/developer.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LoginController } from './auth/login/login.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { RegisterController } from './auth/register/register.controller';
import { JwtStrategy } from './auth/jwt.stratgy';

@Module({
	imports: [HttpModule,
		MongooseModule.forRoot('mongodb://localhost:27017/auth', { useNewUrlParser: true, useCreateIndex: true }),
		MongooseModule.forFeature([
			{ name: 'Users', schema: UsersSchema },
			{ name: 'Developers', schema: DeveloperSchema },
			{ name: 'Apps', schema: AppSchema }
		]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: jwtConstants.jwtSecret,
			signOptions: { expiresIn: '24h' }
		})
	],
	controllers: [ LoginController, RegisterController, AppController, DeveloperController ],
	providers: [AuthService,UsersService, AppService, DeveloperService , JwtStrategy]
})
export class AppModule {}
