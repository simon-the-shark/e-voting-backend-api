// constituency.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConstituencyController } from './constituency.controller';
import { ConstituencyService } from './constituency.service';
import { ConstituencyDto } from './dto/constituency.dto';
import { RolesGuard } from '../auth/role-auth.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

const mockConstituencyService = {
  findAll: jest.fn(),
};

jest.mock('../auth/jwt/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn(() => true),
  })),
}));

jest.mock('../auth/role-auth.guard', () => ({
  RolesGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn(() => true),
  })),
}));

describe('ConstituencyController', () => {
  let controller: ConstituencyController;
  let service: ConstituencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstituencyController],
      providers: [
        {
          provide: ConstituencyService,
          useValue: mockConstituencyService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<ConstituencyController>(ConstituencyController);
    service = module.get<ConstituencyService>(ConstituencyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of ConstituencyDto if exist', async () => {
      const mockConstituencies: ConstituencyDto[] = [
        {
          id: 1,
          constituencyNumber: 101,
          name: 'Constituency A',
          votingType: 'wojt',
        },
        {
          id: 2,
          constituencyNumber: 102,
          name: 'Constituency B',
          votingType: 'wojt',
        },
      ];

      mockConstituencyService.findAll.mockResolvedValue(mockConstituencies);

      const result = await controller.findAll();

      expect(result).toEqual(mockConstituencies);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty list when there are no records', async () => {
      mockConstituencyService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when service does', async () => {
      mockConstituencyService.findAll.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(controller.findAll()).rejects.toThrow('Database error');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
