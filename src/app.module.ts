import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeveloperModule } from './developer/developer.module';

@Module({
  imports: [AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
    DeveloperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
