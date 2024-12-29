import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private readonly repository: Repository<Administrator>,
  ) {}

  async findAllAdminUsers() {
    const admins = await this.repository.find({ relations: ['user'] });
    return admins.map((admin) => admin.user.id);
  }
}
