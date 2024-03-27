import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { LoginDto, RegistroDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(body: LoginDto) {
    try {
      const procuraUsu = await this.prisma.login.findFirst({
        where: { EMAIL: body.EMAIL, SENHA: body.SENHA },
        include: { PESSOA: true },
      });

      if (!procuraUsu) {
        throw new HttpException(
          'Usuario ou senha incorreto',
          HttpStatus.NOT_FOUND,
        );
      }

      const token = await this.assinaToken({
        EMAIL: procuraUsu.EMAIL,
        SENHA: procuraUsu.SENHA,
        PERMISSAO: procuraUsu.PERMISSAO,
        CODUSU: procuraUsu.CODUSU,
        CODPES: procuraUsu.PESSOA.CODPES,
        NOME: procuraUsu.PESSOA.NOME,
        SOBRENOME: procuraUsu.PESSOA.SOBRENOME,
        CPF: procuraUsu.PESSOA.CPF,
      });

      return token;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async registro(body: RegistroDto) {
    try {
      const procuraUsu = await this.prisma.login.findFirst({
        where: { EMAIL: body.EMAIL },
      });

      if (procuraUsu) {
        throw new HttpException(
          'Já existe um usuario com esse email',
          HttpStatus.CONFLICT,
        );
      }

      const primeiroUsu = await this.prisma.login.create({
        data: { EMAIL: body.EMAIL, SENHA: body.SENHA },
      });

      await this.prisma.pessoa.create({
        data: {
          NOME: body.NOME,
          SOBRENOME: body.SOBRENOME,
          CPF: body.CPF,
          CODUSU: primeiroUsu.CODUSU,
        },
      });

      return primeiroUsu;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async assinaToken(args: {
    CODUSU: number;
    EMAIL: string;
    SENHA: string;
    PERMISSAO: string;
    CODPES: number;
    NOME: string;
    SOBRENOME: string;
    CPF: string;
  }) {
    const payload = args;
    return await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: 'facul',
    });
  }
}
