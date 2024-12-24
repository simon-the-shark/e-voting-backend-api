import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateVoterDto } from './dto/create-voter.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VoterService {
  constructor(
    @InjectRepository(Voter)
    private voterRepository: Repository<Voter>,
    private usersService: UsersService,
  ) {}

  async create(createVoterDto: CreateVoterDto): Promise<Voter> {
    const { pesel } = createVoterDto;
    const user = await this.usersService.findOne(pesel);
    const voter = this.voterRepository.create({ ...createVoterDto, user });
    return this.voterRepository.save(voter);
  }

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
    });
  }
}
