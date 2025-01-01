import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { VotingCard } from './entities/voting-card.entity';
import { VoterService } from 'src/voter/voter.service';
import { InjectRepository } from '@nestjs/typeorm';
import { VotingCardDetailsDto } from './dto/voting-card.dto';
import { Candidate } from 'src/candidate/entities/candidate.entity';
import { CardAssignmentService } from 'src/card-assignment/card-assignment.service';
import { CreateVotingCardDTO } from './dto/create-voting-card.dto';
import { FindVotingCardDto } from './dto/find-voting-card.dto';

@Injectable()
export class VotingCardService {
  constructor(
    @InjectRepository(VotingCard)
    private votingCardRepository: Repository<VotingCard>,
    private voterService: VoterService,
    private cardAssignmentService: CardAssignmentService,
  ) {}

  async create(data: CreateVotingCardDTO) {
    const card = this.votingCardRepository.create(data);
    return this.votingCardRepository.save(card);
  }

  async findByYearAndVotingTypeAndConstituency(where: FindVotingCardDto) {
    return this.votingCardRepository.findOne({ where });
  }

  async shuffleCandidates(votingCard: VotingCard, candidates: Candidate[]) {
    // Shuffle the candidates array
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    // Assign shuffled candidates to the voting card
    for (let i = 0; i < candidates.length; i++) {
      await this.cardAssignmentService.create({
        candidateId: candidates[i].id,
        numberOnCard: i + 1,
        votingCardId: votingCard.id,
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.votingCardRepository.findOne({
      where: {
        id: votingCard.id,
      },
      relations: ['cardAssignment'],
    });
  }

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
