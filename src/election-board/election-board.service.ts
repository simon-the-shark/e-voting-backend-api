import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ElectionBoard } from './entities/election-board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionBoardDto } from './dto/election-board.dto';

@Injectable()
export class ElectionBoardService {
  constructor(
    @InjectRepository(ElectionBoard)
    private readonly repository: Repository<ElectionBoard>,
  ) {}

  async findAll(): Promise<ElectionBoardDto[]> {
    return await this.repository.find({
      relations: ['constituencies'],
    });
  }

  async findOne(id: number): Promise<ElectionBoardDto> {
    return await this.repository.findOne({
      where: { id },
      relations: ['constituencies'],
    });
  }
}
