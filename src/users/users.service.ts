import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findOne(pesel: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { pesel } });
  }

  remove(pesel: string) {
    console.log(pesel);
    return this.usersRepository.delete({ pesel });
  }

  async getRoles(pesel: string): Promise<UserRole[]> {
    console.log(pesel);
    const user = await this.usersRepository.findOne({
      where: { pesel },
      relations: ['administrator', 'boardMember', 'voter'],
    });
    const allUsers = await this.usersRepository.find();
    console.log(user);
    console.log(allUsers);
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
