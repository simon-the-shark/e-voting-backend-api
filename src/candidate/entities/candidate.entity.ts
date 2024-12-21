import { CardAssignment } from 'src/card-assignment/entities/card-assignment.entity';
import { Constituency } from 'src/constituency/entities/constituency.entity';
import { ElectionCommittee } from 'src/election-committee/entities/elecition-committee.entity';
import { Vote } from 'src/vote/entities/vote.entity';
import {
  Column,
  Entity,
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

  @ManyToOne(() => Constituency, (constituency) => constituency.candidates)
  constituency: Constituency;

  @ManyToOne(
    () => ElectionCommittee,
    (electionCommittee) => electionCommittee.candidates,
  )
  electionCommittee: ElectionCommittee;

  @OneToOne(() => CardAssignment, (cardAssignment) => cardAssignment.candidate)
  cardAssignment: CardAssignment;

  @ManyToMany(() => Vote, (vote) => vote.candidates)
  votes: Vote[];
}
