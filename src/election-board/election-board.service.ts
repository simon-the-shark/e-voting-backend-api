import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ElectionBoard } from './entities/election-board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ElectionBoardService {
  constructor(
    @InjectRepository(ElectionBoard)
    private readonly repository: Repository<ElectionBoard>,
  ) {}

  async findAll(): Promise<ElectionBoard[]> {
    return await this.repository.find();
  }
}
