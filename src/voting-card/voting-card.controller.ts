import { Controller, HttpException, HttpStatus, Param } from '@nestjs/common';
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
import { VotingCardDto } from './dto/voting-card-details.dto';
import { VotingCardDetailsDto } from './dto/voting-card.dto';
import { z } from 'zod';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('voting-cards')
export class VotingCardController {
  constructor(private readonly votingCardService: VotingCardService) {}

  @Roles(UserRole.Voter)
  @Get()
  async getAllForCurrentUser(@Req() req: Request): Promise<VotingCardDto[]> {
    const user = req.user as User;
    const res = await this.votingCardService.getAllAvailableForUser(user.id);
    console.log(res);
    return z.array(VotingCardDto).parse(res);
  }

  @Roles(UserRole.Voter)
  @Get(':id')
  async getDetails(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<VotingCardDetailsDto> {
    const user = req.user as User;
    const votingCardId = Number(id);
    if (
      !this.votingCardService.verifyVotingCardPermissions(votingCardId, user.id)
    ) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const details = await this.votingCardService.getVotingCardDetails(
      votingCardId,
      user.id,
    );
    return VotingCardDetailsDto.parse(details);
  }
}
