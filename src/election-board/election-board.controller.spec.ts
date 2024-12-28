import { Test, TestingModule } from '@nestjs/testing';
import { ElectionBoardController } from './election-board.controller';

describe('ElectionBoardController', () => {
  let controller: ElectionBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionBoardController],
    }).compile();

    controller = module.get<ElectionBoardController>(ElectionBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
