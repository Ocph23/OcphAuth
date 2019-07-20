import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
    UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
