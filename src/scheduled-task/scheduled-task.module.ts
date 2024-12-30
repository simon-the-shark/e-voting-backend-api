import { ScheduledTaskService } from './scheduled-task.service';
import { UserMessageModule } from 'src/user-message/user-message.module';
import { ConstituencyModule } from 'src/constituency/constituency.module';
import { Module } from '@nestjs/common';
import { VotingCardModule } from 'src/voting-card/voting-card.module';

@Module({
  imports: [UserMessageModule, VotingCardModule, ConstituencyModule],
  providers: [ScheduledTaskService],
  exports: [ScheduledTaskService],
})
export class ScheduleTaskModule {}
