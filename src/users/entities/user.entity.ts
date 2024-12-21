import { Administrator } from 'src/administrator/entities/administrator.entity';
import { CommitteeMember } from 'src/committee-member/entities/committee-member.entity';
import { Voter } from 'src/voter/entities/voter.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  pesel: string;

  @OneToOne(() => Administrator, (administrator) => administrator.user, {
    nullable: true,
  })
  administrator?: Administrator;

  @OneToOne(() => CommitteeMember, (committeeMember) => committeeMember.user, {
    nullable: true,
  })
  committeeMember?: CommitteeMember;

  @OneToOne(() => Voter, (voter) => voter.user, { nullable: true })
  voter?: Voter;
}
