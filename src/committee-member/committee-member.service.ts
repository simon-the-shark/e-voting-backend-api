import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CommitteeMember } from './entities/committee-member.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommitteeMemberService {
  constructor(
    @InjectRepository(CommitteeMember)
    private adminRepository: Repository<CommitteeMember>,
  ) {}

  async create(user: User, manager: EntityManager): Promise<CommitteeMember> {
    const admin = manager.create(CommitteeMember, {
      user,
    });
    return manager.save(admin);
  }

  async findOne(user: User): Promise<CommitteeMember | undefined> {
    return this.adminRepository.findOne({ where: { user } });
  }
}
