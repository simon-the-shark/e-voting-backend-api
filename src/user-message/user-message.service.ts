import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from './entities/user-message.entity';
import { MessageDto } from './dto/message.dto';
import { UsersService } from '../users/users.service';
import { AdministratorService } from '../administrator/administrator.service';
import { CreateAdminMessageDto } from './dto/create-admin-message.dto';

@Injectable()
export class UserMessageService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>,
    private readonly userService: UsersService,
    private readonly adminService: AdministratorService,
  ) {}
  async createMessage(dto: CreateMessageDto) {
    const user = await this.userService.findById(dto.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const maybeExisting = await this.userMessageRepository.findOne({
      where: {
        indetifier: dto.indetifier,
        user,
      },
    });
    if (maybeExisting !== null && maybeExisting !== undefined) {
      return; // duplicate alert
    }

    const newOne = this.userMessageRepository.create({
      ...dto,
      isRead: false,
      user,
    });
    await this.userMessageRepository.save(newOne);
  }

  async createMessageForAllAdmins(dto: CreateAdminMessageDto) {
    const admins = await this.adminService.findAllAdminUsers();
    for (const adminUserId of admins) {
      this.createMessage({
        ...dto,
        userId: adminUserId,
      });
    }
  }

  async markAsRead(id: number) {
    await this.userMessageRepository.update(id, { isRead: true });
  }

  async getAllUnread(userId: number): Promise<MessageDto[]> {
    return this.userMessageRepository.find({
      where: {
        user: {
          id: userId,
        },
        isRead: false,
      },
    });
  }

  async findOneById(id: number) {
    return this.userMessageRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });
  }
}
