// committee member entity

import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { ElectionBoard } from 'src/election-board/entities/election-board.entity';

@Entity()
export class BoardMember {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => ElectionBoard, (electionBoard) => electionBoard.boardMembers)
  @JoinColumn()
  electionBoard: ElectionBoard;
}
