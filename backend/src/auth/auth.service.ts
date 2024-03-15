import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(body: LoginDto) {
    try {
      const procuraUsu = await this.prisma.login.findFirst({
        where: { EMAIL: body.EMAIL, SENHA: body.SENHA },
      });

      if (!procuraUsu) {
        throw new HttpException(
          'Usuario ou senha incorreto',
          HttpStatus.NOT_FOUND,
        );
      }

      return true;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async primeiroCadastro(body: LoginDto) {
    try {
      const procuraUsu = await this.prisma.login.findFirst({
        where: {},
      });

      if (procuraUsu) {
        throw new HttpException(
          'Já existe um primeiro usuario no banco',
          HttpStatus.CONFLICT,
        );
      }

      const primeiroUsu = await this.prisma.login.create({
        data: { EMAIL: body.EMAIL, SENHA: body.SENHA },
      });

      return primeiroUsu;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
