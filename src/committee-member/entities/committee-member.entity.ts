// committee member entity

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { ElectionCommittee } from 'src/election-committee/entities/election-committee.entity';

@Entity()
export class CommitteeMember {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => ElectionCommittee,
    (electionCommittee) => electionCommittee.committeeMembers,
  )
  electionCommittee: ElectionCommittee;
}
