import { Module } from '@nestjs/common';
import { ConstituencyService } from './constituency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constituency } from './entities/constituency.entity';
import { ConstituencyController } from './constituency.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Constituency]), AuthModule, UsersModule],
  providers: [ConstituencyService],
  exports: [ConstituencyService],
  controllers: [ConstituencyController],
})
export class ConstituencyModule {}
