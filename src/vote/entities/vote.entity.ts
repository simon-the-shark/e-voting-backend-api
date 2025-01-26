import { Candidate } from '../../candidate/entities/candidate.entity';
import { VotingCard } from '../../voting-card/entities/voting-card.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => VotingCard, (votingCard) => votingCard.votes)
  @JoinColumn()
  votingCard: VotingCard;

  @ManyToMany(() => Candidate, (candidate) => candidate.votes)
  @JoinTable({
    name: 'vote_candidate',
    joinColumn: { name: 'vote_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'candidate_id', referencedColumnName: 'id' },
  })
  candidates: Candidate[];
}
