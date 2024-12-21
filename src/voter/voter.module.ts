import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voter } from './entities/voter.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Voter]), UsersModule],
  providers: [VoterService],
  exports: [VoterService],
})
export class VoterModule {}
