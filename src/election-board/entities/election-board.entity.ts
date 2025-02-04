import { BoardMember } from '../../board-member/entities/board-member.entity';
import { Constituency } from '../../constituency/entities/constituency.entity';
import { Voter } from '../../voter/entities/voter.entity';
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
export class ElectionBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  number: number;

  @ManyToMany(
    () => Constituency,
    (constituency) => constituency.electionBoards,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinTable({
    name: 'election_board_constituency',
    joinColumn: { name: 'election_board_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'constituency_id', referencedColumnName: 'id' },
  })
  constituencies: Constituency[];

  @OneToMany(() => BoardMember, (boardMember) => boardMember.electionBoard)
  boardMembers: BoardMember[];

  @OneToMany(() => Voter, (voter) => voter.electionBoard)
  @JoinColumn()
  voters: Voter[];
}
