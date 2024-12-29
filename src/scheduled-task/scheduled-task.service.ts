import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ConstituencyService } from 'src/constituency/constituency.service';

@Injectable()
export class ScheduledTaskService {
  constructor(private readonly constituencyService: ConstituencyService) {}

  @Interval(100)
  async handleCron() {
    const constituencies =
      await this.constituencyService.findAllWithRelations();
    for (const constituency of constituencies) {
      const { candidates } = constituency;
    }
  }
}
