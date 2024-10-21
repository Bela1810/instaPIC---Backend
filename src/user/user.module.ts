import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
    User
  ]), 
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    global: true,
    signOptions:{expiresIn: '10m'}
  })]
})
export class UserModule {}
