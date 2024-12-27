/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { Get, Req } from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { User } from 'src/users/entities/user.entity';
import { MessageDto } from './dto/message.dto';
import { MarkReadMessageDto } from './dto/mark-read-message.dto';

@Controller('user-messages')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Get()
  async getUnreadMessages(@Req() req): Promise<MessageDto[]> {
    const user = req.user as User;
    return this.userMessageService.getAllUnread(user.id);
  }

  @Patch('/:id')
  async markAsRead(
    @Req() req,
    @Param('id') id: string,
    @Body() markReadMessageDto: MarkReadMessageDto,
  ): Promise<void> {
    const user = req.user;
    const mId = parseInt(id, 10);
    const message = await this.userMessageService.findOneById(mId);
    if (message.user.id !== (user?.id ?? user.userId)) {
      throw new Error('You can only mark your own messages as read');
    }
    await this.userMessageService.markAsRead(message.id);
  }
}
