import { Module } from '@nestjs/common';
import { ElectionCommitteeService } from './election-committee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionCommittee } from './entities/elecition-committee.entity';
import { ElectionCommitteeController } from './election-committee.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserMessageModule } from 'src/user-message/user-message.module';

@Module({
  imports: [
    UserMessageModule,
    TypeOrmModule.forFeature([ElectionCommittee]),
    AuthModule,
  ],
  providers: [ElectionCommitteeService],
  exports: [ElectionCommitteeService],
  controllers: [ElectionCommitteeController],
})
export class ElectionCommitteeModule {}
