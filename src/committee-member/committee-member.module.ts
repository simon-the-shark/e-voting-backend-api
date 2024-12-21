import { Module } from '@nestjs/common';
import { CommitteeMemberService } from './committee-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitteeMember } from './entities/committee-member.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommitteeMember]), UsersModule],
  providers: [CommitteeMemberService],
  exports: [CommitteeMemberService],
})
export class CommitteeMemberModule {}
