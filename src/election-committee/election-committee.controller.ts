import { Controller, Req, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ElectionCommitteeService } from './election-committee.service';
import { ElectionCommitteeDto } from './dto/election-committe.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';
import { z } from 'zod';
import { UserMessageService } from 'src/user-message/user-message.service';
import { User } from 'src/users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('election-committees')
export class ElectionCommitteeController {
  constructor(
    private readonly electionCommitteeService: ElectionCommitteeService,
    private readonly userMessageService: UserMessageService,
  ) {}

  @Get()
  @Roles(UserRole.Administrator)
  async getAll(@Req() req): Promise<ElectionCommitteeDto[]> {
    const elements = z
      .array(ElectionCommitteeDto)
      .parse(await this.electionCommitteeService.findAll());
    if (elements.length === 0) {
      const user = req.user as User;
      this.userMessageService.createMessage({
        message: 'There are no election committees',
        userId: user.id,
        isDangerous: true,
      });
    }
    return elements;
  }
}
