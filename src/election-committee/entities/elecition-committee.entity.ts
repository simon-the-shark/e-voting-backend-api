import { Candidate } from '../../candidate/entities/candidate.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ElectionCommittee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Candidate, (candidate) => candidate.electionCommittee)
  candidates: Candidate[];
}
