import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findOne(pesel: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { pesel } });
  }

  findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getRoles(pesel: string): Promise<UserRole[]> {
    const user = await this.usersRepository.findOne({
      where: { pesel },
      relations: ['administrator', 'boardMember', 'voter'],
    });
    const ifAdmin = user.administrator;
    const ifBoardMember = user.boardMember;
    const ifVoter = user.voter;

    return Promise.all([ifAdmin, ifBoardMember, ifVoter]).then(
      ([admin, boardMember, voter]) => {
        const roles: UserRole[] = [];
        if (admin) {
          roles.push(UserRole.Administrator);
        }
        if (boardMember) {
          roles.push(UserRole.BoardMember);
        }
        if (voter) {
          roles.push(UserRole.Voter);
        }

        return roles;
      },
    );
  }
}
