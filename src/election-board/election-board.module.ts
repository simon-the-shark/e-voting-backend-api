import { Module } from '@nestjs/common';
import { ElectionBoardService } from './election-board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionBoard } from './entities/election-board.entity';
import { ElectionBoardController } from './election-board.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ConstituencyModule } from 'src/constituency/constituency.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ElectionBoard]),
    AuthModule,
    UsersModule,
    ConstituencyModule,
  ],
  providers: [ElectionBoardService],
  exports: [ElectionBoardService],
  controllers: [ElectionBoardController],
})
export class ElectionBoardModule {}
