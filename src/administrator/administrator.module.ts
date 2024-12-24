import { Module } from '@nestjs/common';

import { AdministratorService } from './administrator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrator])],
  providers: [AdministratorService],
  exports: [AdministratorService],
})
export class AdministratorModule {}
