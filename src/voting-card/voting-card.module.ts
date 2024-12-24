import { Module } from '@nestjs/common';
import { VotingCardService } from './voting-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingCard } from './entities/voting-card.entity';
import { VotingCardController } from './voting-card.controller';
import { AuthModule } from 'src/auth/auth.module';
import { VoterModule } from 'src/voter/voter.module';

@Module({
  imports: [AuthModule, VoterModule, TypeOrmModule.forFeature([VotingCard])],
  providers: [VotingCardService],
  exports: [VotingCardService],
  controllers: [VotingCardController],
})
export class VotingCardModule {}
