import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectionCommittee } from './entities/elecition-committee.entity';

@Injectable()
export class ElectionCommitteeService {
  constructor(
    @InjectRepository(ElectionCommittee)
    private readonly electionCommitteeRepository: Repository<ElectionCommittee>,
  ) {}

  async findAll(): Promise<ElectionCommittee[]> {
    return await this.electionCommitteeRepository.find();
  }
}
