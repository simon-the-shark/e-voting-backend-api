import { Injectable } from '@nestjs/common';
import { CardAssignment } from './entities/card-assignment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class CardAssignmentService {
  constructor(
    @InjectRepository(CardAssignment)
    private readonly repository: Repository<CardAssignment>,
  ) {}

  async create(dto: CreateAssignmentDto) {
    return this.repository.create(dto);
  }

  async clear(data: CardAssignment[]) {
    if (data !== undefined) return this.repository.remove(data.filter(Boolean));
  }
}
