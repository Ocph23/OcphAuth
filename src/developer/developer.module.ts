import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DeveloperSchema } from './developer.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from '../constants';
import { DeveloperJwtStrategy } from './developerJwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Developers', schema: DeveloperSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
  providers: [DeveloperService,DeveloperJwtStrategy],
  controllers: [DeveloperController],
})
export class DeveloperModule {}
