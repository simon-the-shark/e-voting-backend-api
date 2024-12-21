import { Module } from '@nestjs/common';
import { Type } from 'class-transformer';
import { Candidate } from './entities/candidate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateService } from './candidate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  providers: [CandidateService],
  exports: [CandidateService],
})
export class CandidateModule {}
