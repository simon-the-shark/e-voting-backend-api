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
import { VotingType } from 'src/types/voting-type.enum';
import { Constituency } from 'src/constituency/entities/constituency.entity';
import { Voter } from 'src/voter/entities/voter.entity';
import { CardAssignment } from 'src/card-assignment/entities/card-assignment.entity';
import { Vote } from 'src/vote/entities/vote.entity';

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
