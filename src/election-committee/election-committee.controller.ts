import { Controller, Req, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ElectionCommitteeService } from './election-committee.service';
import { ElectionCommitteeDto } from './dto/election-committe.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';
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
  @Roles(UserRole.BoardMember)
  async getAll(@Req() req): Promise<ElectionCommitteeDto[]> {
    const user = req.user as User;
    return this.electionCommitteeService.findAllOrNotify(user);
  }
}
