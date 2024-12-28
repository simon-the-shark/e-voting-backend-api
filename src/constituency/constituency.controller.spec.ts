import { Test, TestingModule } from '@nestjs/testing';
import { ConstituencyController } from './constituency.controller';

describe('ConstituencyController', () => {
  let controller: ConstituencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstituencyController],
    }).compile();

    controller = module.get<ConstituencyController>(ConstituencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
