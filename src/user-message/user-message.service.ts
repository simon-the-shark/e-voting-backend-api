import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from './entities/user-message.entity';

@Injectable()
export class UserMessageService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>,
  ) {}
  async createMessage(dto: CreateMessageDto) {
    const newOne = await this.userMessageRepository.create({
      message: dto.message,
      isRead: false,
      user: {
        id: dto.userId,
      },
    });
    this.userMessageRepository.save(newOne);
  }

  async markAsRead(id: number) {
    await this.userMessageRepository.update(id, { isRead: true });
  }

  async getAllUnread(userId: number) {
    return this.userMessageRepository.find({
      where: {
        user: {
          id: userId,
        },
        isRead: false,
      },
    });
  }
}
