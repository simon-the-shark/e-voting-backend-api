import { Module } from '@nestjs/common';
import { UserMessageService } from './user-message.service';

@Module({
  providers: [UserMessageService]
})
export class UserMessageModule {}
