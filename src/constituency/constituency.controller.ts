import { Controller, UseGuards } from '@nestjs/common';
import { ConstituencyService } from './constituency.service';
import { Get } from '@nestjs/common';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';

@Controller('constituency')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConstituencyController {
  constructor(private readonly constituencyService: ConstituencyService) {}

  @Get()
  @Roles(UserRole.Administrator)
  findAll() {
    return this.constituencyService.findAll();
  }
}
