import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { VoterModule } from 'src/voter/voter.module';
import { VotingCardModule } from 'src/voting-card/voting-card.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    VoterModule,
    VotingCardModule,
    AuthModule,
  ],
  providers: [VoteService],
  exports: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
