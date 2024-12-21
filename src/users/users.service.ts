import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { In, Repository, DataSource } from 'typeorm';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findOne(pesel: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { pesel } });
  }

  remove(pesel: string) {
    return this.usersRepository.delete({ pesel });
  }

  getRoles(user: User): Promise<UserRole[]> {
    const ifAdmin = user.administrator;
    const ifCommitteeMember = user.committeeMember;
    const ifVoter = user.voter;

    return Promise.all([ifAdmin, ifCommitteeMember, ifVoter]).then(
      ([admin, committeeMember, voter]) => {
        const roles: UserRole[] = [];
        if (admin) {
          roles.push(UserRole.Administrator);
        }
        if (committeeMember) {
          roles.push(UserRole.CommitteeMember);
        }
        if (voter) {
          roles.push(UserRole.Voter);
        }

        return roles;
      },
    );
  }
}
