import { Module } from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMessage } from './entities/user-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMessage])],
  providers: [UserMessageService],
  exports: [UserMessageService],
})
export class UserMessageModule {}
