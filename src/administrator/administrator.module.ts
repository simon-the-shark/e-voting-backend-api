import { Module } from '@nestjs/common';

import { AdministratorService } from './administrator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { UsersModule } from 'src/users/users.module';
import { AdministratorController } from './administrator.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Administrator]), UsersModule],
  providers: [AdministratorService],
  exports: [AdministratorService],
  controllers: [AdministratorController],
})
export class AdministratorModule {}
