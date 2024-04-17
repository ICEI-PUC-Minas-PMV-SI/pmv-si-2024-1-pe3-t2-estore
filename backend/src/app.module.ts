import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EnderecoService } from './endereco/endereco.service';
import { PessoaService } from './pessoa/pessoa.service';
import { PessoaController } from './pessoa/pessoa.controller';
import { EnderecoController } from './endereco/endereco.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    PessoaController,
    EnderecoController,
  ],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    JwtService,
    EnderecoService,
    PessoaService,
  ],
})
export class AppModule {}
