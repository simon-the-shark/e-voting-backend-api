import { Test, TestingModule } from '@nestjs/testing';
import { ElectionBoardController } from './election-board.controller';
import { ElectionBoardService } from './election-board.service';
import { RolesGuard } from '../auth/role-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UpdateElectionBoardDto } from './dto/update-election-board.dto';

const mockElectionBoard = {
  id: 1,
  address: 'Test Address',
  number: 101,
  constituencies: [
    {
      id: 1,
      constituencyNumber: 1,
      name: 'Test Constituency',
      votingType: 'Mayor',
      electionBoards: [],
    },
  ],
};

describe('ElectionBoardController', () => {
  let controller: ElectionBoardController;
  let service: ElectionBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionBoardController],
      providers: [
        {
          provide: ElectionBoardService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockElectionBoard]),
            findOne: jest.fn().mockResolvedValue(mockElectionBoard),
            update: jest.fn().mockResolvedValue(mockElectionBoard),
          },
        },
        {
          provide: RolesGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ElectionBoardController>(ElectionBoardController);
    service = module.get<ElectionBoardService>(ElectionBoardService);
  });

  describe('findAll', () => {
    it('should return all election boards', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockElectionBoard]);
    });

    it('should handle the case when no election boards are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single election board', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockElectionBoard);
    });

    it('should handle the case when the election board is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      const result = await controller.findOne('2');
      expect(service.findOne).toHaveBeenCalledWith(2);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an election board', async () => {
      const updateDto: UpdateElectionBoardDto = {
        constituenciesId: [{ id: 1 }],
      };
      const result = await controller.update('1', updateDto);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(mockElectionBoard);
    });

    it('should handle the case when the election board to update is not found', async () => {
      const updateDto: UpdateElectionBoardDto = {
        constituenciesId: [{ id: 1 }],
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error('ElectionBoard not found'));
      await expect(controller.update('1', updateDto)).rejects.toThrow(
        'ElectionBoard not found',
      );
    });

    it('should handle the case when the update fails due to invalid constituencies', async () => {
      const updateDto: UpdateElectionBoardDto = {
        constituenciesId: [{ id: 1 }],
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error('Constituencies not found'));
      await expect(controller.update('1', updateDto)).rejects.toThrow(
        'Constituencies not found',
      );
    });
  });
});
