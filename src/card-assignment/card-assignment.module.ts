import { Module } from '@nestjs/common';
import { CardAssignmentService } from './card-assignment.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardAssignment } from './entities/card-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardAssignment])],
  providers: [CardAssignmentService],
  exports: [CardAssignmentService]
})
export class CardAssignmentModule {}
