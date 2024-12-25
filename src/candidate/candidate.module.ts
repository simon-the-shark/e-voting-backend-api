import { Module } from '@nestjs/common';
import { Candidate } from './entities/candidate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate]), AuthModule],
  providers: [CandidateService],
  exports: [CandidateService],
  controllers: [CandidateController],
})
export class CandidateModule {}
