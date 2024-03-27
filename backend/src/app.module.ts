import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService, JwtService],
})
export class AppModule {}
