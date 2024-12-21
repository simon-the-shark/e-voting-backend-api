import { Module } from '@nestjs/common';
import { BoardMemberService } from './board-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMember } from './entities/board-member.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardMember]), UsersModule],
  providers: [BoardMemberService],
  exports: [BoardMemberService],
})
export class BoardMemberModule {}
