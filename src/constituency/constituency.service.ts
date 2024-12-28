import { Injectable } from '@nestjs/common';
import { Constituency } from './entities/constituency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstituencyDto } from './dto/constituency.dto';

@Injectable()
export class ConstituencyService {
  constructor(
    @InjectRepository(Constituency)
    private readonly repository: Repository<Constituency>,
  ) {}

  async findAll(): Promise<ConstituencyDto[]> {
    return await this.repository.find();
  }
}
