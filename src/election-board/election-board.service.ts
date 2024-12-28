import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ElectionBoard } from './entities/election-board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionBoardDto } from './dto/election-board.dto';
import { UpdateElectionBoardDto } from './dto/update-election-board.dto';
import { ConstituencyService } from 'src/constituency/constituency.service';

@Injectable()
export class ElectionBoardService {
  constructor(
    @InjectRepository(ElectionBoard)
    private readonly repository: Repository<ElectionBoard>,
    private readonly constituencyService: ConstituencyService,
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

  async update(
    id: number,
    updateElectionBoardDto: UpdateElectionBoardDto,
  ): Promise<ElectionBoardDto> {
    const electionBoard = await this.repository.findOne({
      where: { id },
      relations: ['constituencies'],
    });

    if (!electionBoard) {
      throw new Error('ElectionBoard not found');
    }
    const constituencies = await this.constituencyService.findByIds(
      updateElectionBoardDto.constituenciesId.map(({ id }) => id),
    );
    if (!constituencies) {
      throw new Error('Constituencies not found');
    }
    electionBoard.constituencies = constituencies;
    await this.repository.save(electionBoard);
    return this.findOne(id);
  }
}
