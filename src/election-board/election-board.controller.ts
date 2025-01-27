import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RolesGuard } from '../auth/role-auth.guard';
import { ElectionBoardService } from './election-board.service';
import { Get } from '@nestjs/common';
import { Roles } from '../auth/role.decorator';
import { UserRole } from '../users/entities/user-role.entity';
import { Param } from '@nestjs/common';
import { UpdateElectionBoardDto } from './dto/update-election-board.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('election-boards')
export class ElectionBoardController {
  constructor(private readonly electionBoardService: ElectionBoardService) {}

  @Get()
  @Roles(UserRole.Administrator)
  findAll() {
    return this.electionBoardService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Administrator)
  findOne(@Param('id') id: string) {
    const electionBoardId = parseInt(id, 10);
    return this.electionBoardService.findOne(electionBoardId);
  }

  @Patch(':id')
  @Roles(UserRole.Administrator)
  update(
    @Param('id') id: string,
    @Body() updateElectionBoardDto: UpdateElectionBoardDto,
  ) {
    const electionBoardId = parseInt(id, 10);
    return this.electionBoardService.update(
      electionBoardId,
      updateElectionBoardDto,
    );
  }
}
