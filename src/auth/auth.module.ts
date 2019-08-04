import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stratgy';
import { jwtConstants } from '../constants';

@Module({
  imports: [UsersModule,
     PassportModule.register({ defaultStrategy: 'jwt' }),
     JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),],
  controllers: [LoginController, RegisterController],
  providers: [AuthService,  LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
 