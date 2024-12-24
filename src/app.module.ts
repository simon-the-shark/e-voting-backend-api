// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdministratorModule } from './administrator/administrator.module';
import { BoardMemberModule } from './board-member/board-member.module';
import { VoterModule } from './voter/voter.module';
import { AuthModule } from './auth/auth.module';
import { ElectionBoardModule } from './election-board/election-board.module';
import { ConstituencyModule } from './constituency/constituency.module';
import { VotingCardModule } from './voting-card/voting-card.module';
import { ElectionCommitteeModule } from './election-committee/election-committee.module';
import { CandidateService } from './candidate/candidate.service';
import { CandidateModule } from './candidate/candidate.module';
import { CardAssignmentModule } from './card-assignment/card-assignment.module';
import { VoteService } from './vote/vote.service';
import { VoteModule } from './vote/vote.module';
import { UserMessageModule } from './user-message/user-message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<
          'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mssql'
        >('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: false,
      }),
    }),
    UsersModule,
    AdministratorModule,
    BoardMemberModule,
    VoterModule,
    AuthModule,
    ElectionBoardModule,
    ConstituencyModule,
    VotingCardModule,
    ElectionCommitteeModule,
    CandidateModule,
    CardAssignmentModule,
    VoteModule,
    UserMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, CandidateService, VoteService],
})
export class AppModule {}
