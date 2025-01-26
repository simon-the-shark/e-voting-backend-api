import { CardAssignment } from '../../card-assignment/entities/card-assignment.entity';
import { Constituency } from '../../constituency/entities/constituency.entity';
import { ElectionCommittee } from '../../election-committee/entities/elecition-committee.entity';
import { Vote } from '../../vote/entities/vote.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  party: string;

  @Column()
  electionProgram: string;

  @ManyToOne(
    () => ElectionCommittee,
    (electionCommittee) => electionCommittee.candidates,
  )
  @JoinColumn()
  electionCommittee: ElectionCommittee;

  @OneToOne(() => CardAssignment, (cardAssignment) => cardAssignment.candidate)
  @JoinColumn()
  cardAssignment: CardAssignment;

  @ManyToMany(() => Vote, (vote) => vote.candidates)
  @JoinColumn()
  votes: Vote[];

  @ManyToOne(() => Constituency, (constituency) => constituency.candidates)
  @JoinColumn()
  constituency: Constituency;
}
