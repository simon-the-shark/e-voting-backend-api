import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class VoterService {
  constructor(
    @InjectRepository(Voter)
    private adminRepository: Repository<Voter>,
  ) {}

  async create(user: User, manager: EntityManager): Promise<Voter> {
    const admin = manager.create(Voter, {
      user,
    });
    return manager.save(admin);
  }

  async findOne(user: User): Promise<Voter | undefined> {
    return this.adminRepository.findOne({ where: { user } });
  }
}
