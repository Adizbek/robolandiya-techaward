import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersController} from "./users/users.controller";

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot("mongodb://robolandiya:robolandiya_password@localhost:27017")],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
