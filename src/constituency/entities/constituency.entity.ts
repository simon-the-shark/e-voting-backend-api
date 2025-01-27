import { Candidate } from '../../candidate/entities/candidate.entity';
import { ElectionBoard } from '../../election-board/entities/election-board.entity';
import { VotingCard } from '../../voting-card/entities/voting-card.entity';
import { VotingType } from '../../types/voting-type.enum';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @OneToMany(() => Candidate, (candidate) => candidate.constituency)
  candidates: Candidate[];
}
