import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ElectionBoard } from 'src/election-board/entities/election-board.entity';
import { VotingCard } from 'src/voting-card/entities/voting-card.entity';

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

  @ManyToOne(() => ElectionBoard, (electionBoard) => electionBoard.voters)
  electionBoard: ElectionBoard;

  @ManyToMany(() => VotingCard, (votingCard) => votingCard.voters)
  votingCards: VotingCard[];
}
