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

  async getVotingCardById(userId: number) {
    const voter = await this.voterService.findOneByUserId(userId);
    if (!voter) {
      return null;
    }
    return this.votingCardRepository.findOne({
      where: {
        voters: {
          id: voter.id,
        },
      },
    });
  }
}
