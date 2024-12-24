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

  @ManyToOne(() => ElectionBoard, (electionBoard) => electionBoard.voters, {
    nullable: true,
  })
  @JoinColumn({ name: 'electionBoardId' })
  electionBoard: ElectionBoard | null;

  @ManyToMany(() => VotingCard, (votingCard) => votingCard.voters)
  @JoinColumn()
  votingCards: VotingCard[];
}
