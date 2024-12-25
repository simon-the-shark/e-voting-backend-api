import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ElectionCommitteeService } from './election-committee.service';
import { ElectionCommitteeDto } from './dto/election-committe.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';
import { z } from 'zod';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('election-committees')
export class ElectionCommitteeController {
  constructor(
    private readonly electionCommitteeService: ElectionCommitteeService,
  ) {}

  @Get()
  @Roles(UserRole.Administrator)
  async getAll(): Promise<ElectionCommitteeDto[]> {
    return z
      .array(ElectionCommitteeDto)
      .parse(await this.electionCommitteeService.findAll());
  }
}
