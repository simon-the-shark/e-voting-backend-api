import { Module } from '@nestjs/common';
import { CommitteeMemberService } from './committee-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitteeMember } from './entities/committee-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommitteeMember])],
  providers: [CommitteeMemberService],
  exports: [CommitteeMemberService],
})
export class CommitteeMemberModule {}
