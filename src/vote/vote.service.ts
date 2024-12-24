import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { VoterService } from 'src/voter/voter.service';
import { VotingCardService } from 'src/voting-card/voting-card.service';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    private voterService: VoterService,
    private votingCardService: VotingCardService,
  ) {}

  async createVote(createVoteDto: CreateVoteDto, userId: number) {
    const votingCard = await this.votingCardService.findById(
      createVoteDto.votingCardId,
    );
    if (!votingCard) {
      throw new Error('Voting card not found');
    }
    const voter = await this.voterService.findOneByUserId(userId);
    if (voter.votingCards.some((card) => card.id === votingCard.id)) {
      throw new Error('Has already voted for this');
    }
    const vote = this.voteRepository.create({
      votingCard: {
        id: createVoteDto.votingCardId,
      },
      candidates: createVoteDto.candidates,
    });
    this.voterService.markVotingCardVoted(votingCard, voter);
    await this.voteRepository.save(vote);
  }
}
