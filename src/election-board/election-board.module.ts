import { Module } from '@nestjs/common';
import { ElectionBoardService } from './election-board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionBoard } from './entities/election-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElectionBoard])],
  providers: [ElectionBoardService],
  exports: [ElectionBoardService],
})
export class ElectionBoardModule {}
