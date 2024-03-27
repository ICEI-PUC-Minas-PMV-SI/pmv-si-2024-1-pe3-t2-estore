import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistroDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/registro')
  primeiroCad(@Query() body: RegistroDto) {
    return this.authService.registro(body);
  }
}
