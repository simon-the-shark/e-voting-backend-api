import { Injectable } from '@nestjs/common';
import { Constituency } from './entities/constituency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  async findAllWithRelations(): Promise<Constituency[]> {
    return await this.repository.find({
      relations: ['candidates'],
    });
  }

  async findByIds(ids: number[]): Promise<Constituency[]> {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
