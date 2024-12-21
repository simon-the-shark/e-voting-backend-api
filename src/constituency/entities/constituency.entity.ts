import { Candidate } from 'src/candidate/entities/candidate.entity';
import { ElectionBoard } from 'src/election-board/entities/election-board.entity';
import { VotingType } from 'src/types/voting-type.enum';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
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
  electionBoard: ElectionBoard[];

  @OneToMany(() => Candidate, (candidate) => candidate.constituency)
  candidates: Candidate[];
}
