import { Candidate } from 'src/candidate/entities/candidate.entity';
import { VotingCard } from 'src/voting-card/entities/voting-card.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class CardAssignment {
  @OneToOne(() => Candidate, (candidate) => candidate.cardAssignment)
  @JoinColumn({ name: 'candidateId' })
  candidate: Candidate;

  @ManyToOne(() => VotingCard, (votingCard) => votingCard.cardAssignment)
  @JoinColumn({ name: 'votingCardId' })
  votingCard: VotingCard;

  @PrimaryColumn()
  candidateId: number;

  @PrimaryColumn()
  votingCardId: number;

  @Column({ nullable: true })
  numberOnCard: number;
}
