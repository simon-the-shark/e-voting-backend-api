import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';
import { Repository } from 'typeorm/repository/Repository';
import { User } from 'src/users/entities/user.entity';
import { VotingCard } from 'src/voting-card/entities/voting-card.entity';

@Injectable()
export class VoterService {
  constructor(
    @InjectRepository(Voter)
    private voterRepository: Repository<Voter>,
  ) {}

  async findOne(user: User): Promise<Voter | undefined> {
    return this.voterRepository.findOne({ where: { user } });
  }

  async findOneByUserId(userId: number): Promise<Voter | undefined> {
    return this.voterRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: [
        'electionBoard',
        'electionBoard.constituencies',
        'electionBoard.constituencies.votingCard',
        'votingCards',
      ],
    });
  }

  async markVotingCardVoted(card: VotingCard, voter: Voter) {
    voter.votingCards.push(card);
    await this.voterRepository.save(voter);
  }
}
