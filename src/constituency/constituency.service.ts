import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constituency } from './entities/constituency.entity';
import { Repository } from 'typeorm';
import { ConstituencyDto } from './dto/constituency.dto';

@Injectable()
export class ConstituencyService {
  constructor(
    @InjectRepository(Constituency)
    private constituencyRepository: Repository<Constituency>,
  ) {}

  async create(constituency: ConstituencyDto): Promise<Constituency> {
    return this.constituencyRepository.save(constituency);
  }
}
