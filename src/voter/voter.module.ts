import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voter])],
  providers: [VoterService],
  exports: [VoterService],
})
export class VoterModule {}
