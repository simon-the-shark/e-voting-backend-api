import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectionCommittee } from './entities/elecition-committee.entity';
import { UserMessageService } from '../user-message/user-message.service';
import { User } from '../users/entities/user.entity';
import { ElectionCommitteeDto } from './dto/election-committe.dto';
import { z } from 'zod';

@Injectable()
export class ElectionCommitteeService {
  constructor(
    @InjectRepository(ElectionCommittee)
    private readonly electionCommitteeRepository: Repository<ElectionCommittee>,
    private readonly userMessageService: UserMessageService,
  ) {}

  async findAll(): Promise<ElectionCommittee[]> {
    return await this.electionCommitteeRepository.find();
  }

  async findAllOrNotify(user: User): Promise<ElectionCommitteeDto[]> {
    const all = await this.electionCommitteeRepository.find();
    if (all.length === 0) {
      this.userMessageService.createMessage({
        message: 'There are no election committees',
        userId: user.id,
        isDangerous: true,
        indetifier: `no-commitess-user-${user.id}`,
      });
    }
    return z.array(ElectionCommitteeDto).parse(all);
  }
  async findOne(id: number): Promise<ElectionCommittee> {
    return await this.electionCommitteeRepository.findOneBy({ id });
  }
}
