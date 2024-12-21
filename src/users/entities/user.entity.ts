import { Administrator } from 'src/administrator/entities/administrator.entity';
import { BoardMember } from 'src/board-member/entities/board-member.entity';
import { UserMessage } from 'src/user-message/entities/user-message.entity';
import { Voter } from 'src/voter/entities/voter.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

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

  @OneToOne(() => BoardMember, (boardMember) => boardMember.user, {
    nullable: true,
  })
  boardMember?: BoardMember;

  @OneToOne(() => Voter, (voter) => voter.user, { nullable: true })
  voter?: Voter;

  @OneToMany(() => UserMessage, (userMessage) => userMessage.user)
  userMessages: UserMessage[];
}
