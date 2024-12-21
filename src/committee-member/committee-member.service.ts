import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CommitteeMember } from './entities/committee-member.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateCommitteeMemberDto } from './dto/create-committee-member.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommitteeMemberService {
  constructor(
    @InjectRepository(CommitteeMember)
    private commiteeMemberRepository: Repository<CommitteeMember>,
    private usersService: UsersService,
  ) {}

  async create(
    CreateCommitteeMemberDto: CreateCommitteeMemberDto,
  ): Promise<CommitteeMember> {
    const { pesel } = CreateCommitteeMemberDto;
    const user = await this.usersService.findOne(pesel);
    const commiteeMember = this.commiteeMemberRepository.create({ user });
    return this.commiteeMemberRepository.save(commiteeMember);
  }

  async findOneWithUser(user: User): Promise<CommitteeMember | undefined> {
    return this.commiteeMemberRepository.findOne({ where: { user } });
  }
}
