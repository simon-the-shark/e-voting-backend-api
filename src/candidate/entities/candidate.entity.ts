import { CardAssignment } from 'src/card-assignment/entities/card-assignment.entity';
import { ElectionCommittee } from 'src/election-committee/entities/elecition-committee.entity';
import { Vote } from 'src/vote/entities/vote.entity';
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
}
