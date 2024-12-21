import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './auth/role-auth.guard';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { Roles } from './auth/role.decorator';
import { UserRole } from './users/entities/user-role.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(UserRole.Administrator)
  getHello(): string {
    return this.appService.getHello();
  }
}
