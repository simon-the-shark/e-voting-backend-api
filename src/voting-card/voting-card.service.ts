import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { VotingCard } from './entities/voting-card.entity';
import { VoterService } from 'src/voter/voter.service';
import { InjectRepository } from '@nestjs/typeorm';
import { VotingCardDetailsDto } from './dto/voting-card.dto';

@Injectable()
export class VotingCardService {
  constructor(
    @InjectRepository(VotingCard)
    private votingCardRepository: Repository<VotingCard>,
    private voterService: VoterService,
  ) {}

  async getAlreadyVotedFor(userId: number) {
    const voter = await this.voterService.findOneByUserId(userId);
    if (!voter) {
      return null;
    }
    return await this.votingCardRepository.find({
      where: {
        voters: {
          id: voter.id,
        },
      },
    });
  }

  async hasAlreadyVotedFor(userId: number, votingCard: VotingCard) {
    const votedFor = await this.getAlreadyVotedFor(userId);
    return votedFor.some((card) => card.id === votingCard.id);
  }

  async getAllAvailableForUser(
    userId: number,
  ): Promise<VotingCardDetailsDto[]> {
    const voter = await this.voterService.findOneByUserId(userId);
    if (!voter) {
      return null;
    }
    const cards = (
      voter.electionBoard?.constituencies.map((c) => c.votingCard) ?? []
    ).filter(Boolean);
    const votedFor = await this.getAlreadyVotedFor(userId);
    if (cards.length === 0) {
      return [];
    }
    return cards.map((card) => ({
      ...card,
      hasVoted: votedFor.some((it) => it?.id === card?.id),
    }));
  }

  async verifyVotingCardPermissions(votingCardId: number, userId: number) {
    const votingCard = await this.votingCardRepository.findOne({
      where: {
        id: Number(votingCardId),
      },
      relations: [
        'constituency',
        'constituency.electionBoards',
        'constituency.electionBoards.voters',
        'constituency.electionBoards.voters.user',
      ],
    });
    return votingCard.constituency.electionBoards.some((board) =>
      board.voters.some((voter) => voter.user.id === userId),
    );
  }

  async getVotingCardDetails(
    votingCardId: number,
    userId: number,
  ): Promise<VotingCardDetailsDto> {
    const votedFor = await this.getAlreadyVotedFor(userId);
    return {
      ...(await this.votingCardRepository.findOne({
        where: {
          id: votingCardId,
        },
        relations: ['cardAssignment', 'cardAssignment.candidate'],
      })),
      hasVoted: votedFor.some((it) => it.id === votingCardId),
    };
  }

  async findById(id: number): Promise<VotingCard> {
    return this.votingCardRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
