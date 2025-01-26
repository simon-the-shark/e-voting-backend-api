import { Controller, UseGuards } from '@nestjs/common';
import { ConstituencyService } from './constituency.service';
import { Get } from '@nestjs/common';
import { RolesGuard } from '../auth/role-auth.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from '../auth/role.decorator';
import { UserRole } from '../users/entities/user-role.entity';

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
