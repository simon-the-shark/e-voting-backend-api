import { Test, TestingModule } from '@nestjs/testing';
import { ElectionCommitteeController } from './election-committee.controller';

describe('ElectionCommitteeController', () => {
  let controller: ElectionCommitteeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionCommitteeController],
    }).compile();

    controller = module.get<ElectionCommitteeController>(
      ElectionCommitteeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
