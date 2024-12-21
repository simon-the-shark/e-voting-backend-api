import { Module } from '@nestjs/common';
import { VotingCardService } from './voting-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingCard } from './entities/voting-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VotingCard])],
  providers: [VotingCardService],
  exports: [VotingCardService],
})
export class VotingCardModule {}
