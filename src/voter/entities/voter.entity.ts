import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ElectionCommittee } from 'src/election-committee/entities/election-committee.entity';

@Entity()
export class Voter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  pesel: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  ifVerified: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => ElectionCommittee,
    (electionCommittee) => electionCommittee.voters,
  )
  electionCommittee: ElectionCommittee;
}
