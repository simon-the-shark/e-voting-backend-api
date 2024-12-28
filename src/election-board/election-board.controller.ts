import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { ElectionBoardService } from './election-board.service';
import { Get } from '@nestjs/common';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('election-boards')
export class ElectionBoardController {
  constructor(private readonly electionBoardService: ElectionBoardService) {}

  @Get()
  @Roles(UserRole.Administrator)
  findAll() {
    return this.electionBoardService.findAll();
  }
}
