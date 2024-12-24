import { Test, TestingModule } from '@nestjs/testing';
import { VotingCardController } from './voting-card.controller';

describe('VotingCardController', () => {
  let controller: VotingCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingCardController],
    }).compile();

    controller = module.get<VotingCardController>(VotingCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
