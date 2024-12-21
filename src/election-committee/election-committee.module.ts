import { Module } from '@nestjs/common';
import { ElectionCommitteeService } from './election-committee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionCommittee } from './entities/election-committee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElectionCommittee])],
  providers: [ElectionCommitteeService],
  exports: [ElectionCommitteeService],
})
export class ElectionCommitteeModule {}
