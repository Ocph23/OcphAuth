import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.stratgy';
import { UsersService } from '../users/users.service';

@Module({
  imports: [UsersModule,UsersService,
     PassportModule.register({ defaultStrategy: 'jwt' }),
     JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),],
  controllers: [LoginController, RegisterController],
  providers: [AuthService, UsersService, LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
 