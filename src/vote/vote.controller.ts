import { Post, Body } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user-role.entity';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @Roles(UserRole.Voter)
  async createVote(@Body() createVoteDto: CreateVoteDto, @Req() req: Request) {
    const user = req.user as User;
    return await this.voteService.createVote(createVoteDto, user.id);
  }
}
