import { CommitteeMember } from 'src/committee-member/entities/committee-member.entity';
import { Constituency } from 'src/constituency/entities/constituency.entity';
import { Voter } from 'src/voter/entities/voter.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ElectionCommittee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  number: number;

  @ManyToMany(
    () => Constituency,
    (constituency) => constituency.electionCommittees,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinTable({
    name: 'election_committee_constituency',
    joinColumn: { name: 'election_committee_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'constituency_id', referencedColumnName: 'id' },
  })
  constituencies: Constituency[];

  @OneToMany(
    () => CommitteeMember,
    (committeeMember) => committeeMember.electionCommittee,
  )
  committeeMembers: CommitteeMember[];

  @OneToMany(() => Voter, (voter) => voter.electionCommittee)
  voters: Voter[];
}
