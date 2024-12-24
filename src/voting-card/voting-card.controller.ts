import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { VotingCardService } from './voting-card.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('voting-cards')
export class VotingCardController {
  constructor(private readonly votingCardService: VotingCardService) {}

  @Roles(UserRole.Voter)
  @Get()
  async getAllForCurrentUser(@Req() req: Request) {
    const user = req.user as User;
    return await this.votingCardService.getVotingCardsById(user.id);
  }
}
