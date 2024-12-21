import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { In, Repository, DataSource } from 'typeorm';
import { AdministratorService } from 'src/administrator/administrator.service';
import { CommitteeMemberService } from 'src/committee-member/committee-member.service';
import { UserRole } from './entities/user-role.entity';
import { VoterService } from 'src/voter/voter.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private adminService: AdministratorService,
    private committeeMemberService: CommitteeMemberService,
    private voterService: VoterService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.dataSource.transaction(async (manager) => {
      const user = manager.create(User, {
        pesel: createUserDto.pesel,
      });
      const savedUser = await manager.save(user);

      for (const role of createUserDto.roles) {
        switch (role) {
          case UserRole.Administrator:
            await this.adminService.create(savedUser, manager);
            break;

          case UserRole.CommitteeMember:
            await this.committeeMemberService.create(savedUser, manager);
            break;
          case UserRole.Voter:
            await this.voterService.create(savedUser, manager);
            break;
          default:
            throw new Error(`Nieznana rola: ${role}`);
        }
      }

      return savedUser;
    });
  }

  findOne(pesel: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { pesel } });
  }

  remove(pesel: string) {
    return this.usersRepository.delete({ pesel });
  }

  getRoles(user: User): Promise<UserRole[]> {
    const ifAdmin = this.adminService.findOne(user);
    const ifCommitteeMember = this.committeeMemberService.findOne(user);
    const ifVoter = this.voterService.findOne(user);

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
