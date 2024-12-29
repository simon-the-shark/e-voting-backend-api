import { Module } from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMessage } from './entities/user-message.entity';
import { UserMessageController } from './user-message.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AdministratorModule } from 'src/administrator/administrator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMessage]),
    AuthModule,
    UsersModule,
    AdministratorModule,
  ],
  providers: [UserMessageService],
  exports: [UserMessageService],
  controllers: [UserMessageController],
})
export class UserMessageModule {}
