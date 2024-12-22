import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { pesel: string }) {
    const user = await this.authService.validateUser(body.pesel);
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.authService.login(user);
  }
}
