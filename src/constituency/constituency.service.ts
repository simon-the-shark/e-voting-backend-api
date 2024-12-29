import { Injectable } from '@nestjs/common';
import { Constituency } from './entities/constituency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ConstituencyDto } from './dto/constituency.dto';

@Injectable()
export class ConstituencyService {
  constructor(
    @InjectRepository(Constituency)
    private readonly repository: Repository<Constituency>,
  ) {}

  async verifyVotingCardRules(constituency: Constituency) {
    const fullObject = await this.repository.findOne({
      where: {
        id: constituency.id,
      },
      relations: [
        'candidates',
        'votingCard',
        'votingCard.cardAssignment',
        'votingCard.cardAssignment.candidate',
      ],
    });
    const cardRows = fullObject.votingCard.cardAssignment;
    const candidatesOnCard = cardRows.map((row) => row.candidate.id);
    const numbersOnCard = cardRows.map((row) => row.numberOnCard);
    console.log(numbersOnCard);
    console.log(candidatesOnCard);
    console.log(fullObject.candidates);
    // check if numbers are in proper sequence 1..n
    for (let i = 1; i <= candidatesOnCard.length; i++) {
      if (!numbersOnCard.includes(i)) {
        return false;
      }
    }

    // check if all candidates from the constituency are on the card
    for (const candidate of fullObject.candidates) {
      if (!candidatesOnCard.includes(candidate.id)) {
        return false;
      }
    }

    // all correct
    return true;
  }

  async findAll(): Promise<ConstituencyDto[]> {
    return await this.repository.find();
  }

  async findAllWithRelations(): Promise<Constituency[]> {
    return await this.repository.find({
      relations: ['candidates'],
    });
  }

  async findByIds(ids: number[]): Promise<Constituency[]> {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
