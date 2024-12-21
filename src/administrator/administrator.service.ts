// administrator.service.ts
import { Injectable } from '@nestjs/common';
import { Administrator } from './entities/administrator.entity';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private adminRepository: Repository<Administrator>,
  ) {}

  async create(user: User, manager: EntityManager): Promise<Administrator> {
    const admin = manager.create(Administrator, {
      user,
    });
    return manager.save(admin);
  }

  async findOne(user: User): Promise<Administrator | undefined> {
    return this.adminRepository.findOne({ where: { user } });
  }
}
