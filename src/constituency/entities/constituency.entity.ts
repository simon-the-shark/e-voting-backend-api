import { ElectionBoard } from 'src/election-board/entities/election-board.entity';
import { VotingType } from 'src/types/voting-type.enum';
import { VotingCard } from 'src/voting-card/entities/voting-card.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Constituency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  constituencyNumber: number;

  @Column()
  name: string;

  @Column()
  votingType: VotingType;

  @ManyToMany(
    () => ElectionBoard,
    (electionBoard) => electionBoard.constituencies,
  )
  electionBoards: ElectionBoard[];

  @OneToOne(() => VotingCard, (votingCard) => votingCard.constituency)
  @JoinTable()
  votingCard: VotingCard;
}
