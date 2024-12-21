import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BoardMember } from './entities/board-member.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateBoardMemberDto } from './dto/create-board-member.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BoardMemberService {
  constructor(
    @InjectRepository(BoardMember)
    private boardMemberRepository: Repository<BoardMember>,
    private usersService: UsersService,
  ) {}

  async create(
    createBoardMemberDto: CreateBoardMemberDto,
  ): Promise<BoardMember> {
    const { pesel } = createBoardMemberDto;
    const user = await this.usersService.findOne(pesel);
    const boardMember = this.boardMemberRepository.create({ user });
    return this.boardMemberRepository.save(boardMember);
  }

  async findOneWithUser(user: User): Promise<BoardMember | undefined> {
    return this.boardMemberRepository.findOne({ where: { user } });
  }
}
