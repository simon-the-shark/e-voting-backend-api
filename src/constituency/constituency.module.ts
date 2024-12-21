import { Module } from '@nestjs/common';
import { ConstituencyService } from './constituency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constituency } from './entities/constituency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Constituency])],
  providers: [ConstituencyService],
  exports: [ConstituencyService],
})
export class ConstituencyModule {}
