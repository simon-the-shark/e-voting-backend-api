import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { VotingCard } from './entities/voting-card.entity';
import { VoterService } from 'src/voter/voter.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VotingCardService {
  constructor(
    @InjectRepository(VotingCard)
    private votingCardRepository: Repository<VotingCard>,
    private voterService: VoterService,
  ) {}

  async getVotingCardsByUserId(userId: number) {
    const voter = await this.voterService.findOneByUserId(userId);
    if (!voter) {
      return null;
    }
    return this.votingCardRepository.find({
      where: {
        voters: {
          id: voter.id,
        },
      },
    });
  }
  async verifyPermissions(votingCardId: number, userId: number) {
    const votingCard = await this.votingCardRepository.findOne({
      where: {
        id: votingCardId,
      },
      relations: ['voters', 'voters.user'],
    });
    return votingCard.voters.some((voter) => voter.user.id === userId);
  }

  async getVotingCardDetails(votingCardId: number) {
    return this.votingCardRepository.findOne({
      where: {
        id: votingCardId,
      },
      relations: ['cardAssignment', 'cardAssignment.candidate'],
    });
  }
}
