import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userMessages)
  @JoinColumn()
  user: User;

  @Column()
  message: string;

  @Column()
  isRead: boolean;

  @Column()
  isDangerous: boolean;
}
