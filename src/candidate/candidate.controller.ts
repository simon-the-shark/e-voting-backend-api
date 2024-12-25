import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { UserRole } from 'src/users/entities/user-role.entity';
import { Roles } from 'src/auth/role.decorator';
import { CandidateDto } from './dto/candidate.dto';
import { z } from 'zod';
import { Body, Param, Patch } from '@nestjs/common';
import { UpdateCandidateCommitteeDto } from './dto/update-candidate-committee.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  @Roles(UserRole.Administrator)
  async getAllCandidates(): Promise<CandidateDto[]> {
    return z.array(CandidateDto).parse(await this.candidateService.findAll());
  }

  @Patch(':id/committee')
  @Roles(UserRole.Administrator)
  async updateCandidateCommittee(
    @Param('id') id: string,
    @Body() updateCandidateCommitteeDto: UpdateCandidateCommitteeDto,
  ) {
    const numberId = parseInt(id, 10);
    console.log('numberId', numberId);
    return this.candidateService.updateCommittee(
      numberId,
      updateCandidateCommitteeDto,
    );
  }
}
