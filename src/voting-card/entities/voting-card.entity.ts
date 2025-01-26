import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VotingType } from '../../types/voting-type.enum';
import { Constituency } from '../../constituency/entities/constituency.entity';
import { Voter } from '../../voter/entities/voter.entity';
import { CardAssignment } from '../../card-assignment/entities/card-assignment.entity';
import { Vote } from '../../vote/entities/vote.entity';

@Entity()
export class VotingCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  votingType: VotingType;

  @Column()
  instriuctions: string;

  @Column()
  title: string;

  @OneToOne(() => Constituency)
  @JoinColumn()
  constituency: Constituency;

  @ManyToMany(() => Voter, (voter) => voter.votingCards)
  @JoinTable({
    name: 'voting_card_voter',
    joinColumn: { name: 'voting_card_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'voter_id', referencedColumnName: 'id' },
  })
  voters: Voter[];

  @OneToMany(
    () => CardAssignment,
    (cardAssignment) => cardAssignment.votingCard,
  )
  cardAssignment: CardAssignment[];

  @OneToMany(() => Vote, (vote) => vote.votingCard)
  votes: Vote[];
}
