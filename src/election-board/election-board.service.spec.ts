import { Test, TestingModule } from '@nestjs/testing';
import { ElectionBoardService } from './election-board.service';
import { Repository } from 'typeorm';
import { ElectionBoard } from './entities/election-board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConstituencyService } from '../constituency/constituency.service';
import { VotingType } from '../types/voting-type.enum';

const mockElectionBoard = {
  id: 1,
  address: 'Test Address',
  number: 101,
  constituencies: [
    {
      id: 1,
      constituencyNumber: 1,
      name: 'Test Constituency',
      votingType: VotingType.Mayor,
      electionBoards: [],
      votingCard: null,
      candidates: [],
    },
  ],
};

describe('ElectionBoardService', () => {
  let service: ElectionBoardService;
  let repository: Repository<ElectionBoard>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectionBoardService,
        {
          provide: getRepositoryToken(ElectionBoard),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: ConstituencyService,
          useValue: {
            findByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ElectionBoardService>(ElectionBoardService);
    repository = module.get<Repository<ElectionBoard>>(
      getRepositoryToken(ElectionBoard),
    );
  });

  describe('findOne', () => {
    it('should return an ElectionBoard when it exists', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockElectionBoard as ElectionBoard);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['constituencies'],
      });
      expect(result).toEqual(mockElectionBoard);
    });

    it('should return null when ElectionBoard does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne(2);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
        relations: ['constituencies'],
      });
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all ElectionBoards', async () => {
      const mockElectionBoards = [mockElectionBoard];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockElectionBoards as ElectionBoard[]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: ['constituencies'],
      });
      expect(result).toEqual(mockElectionBoards);
    });
  });

  describe('update', () => {
    it('should update an ElectionBoard and return the updated board', async () => {
      const updateDto = {
        constituenciesId: [{ id: 1 }],
      };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockElectionBoard as ElectionBoard);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockElectionBoard as ElectionBoard);
      jest
        .spyOn(service['constituencyService'], 'findByIds')
        .mockResolvedValue(mockElectionBoard.constituencies);

      const result = await service.update(1, updateDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['constituencies'],
      });
      expect(service['constituencyService'].findByIds).toHaveBeenCalledWith([
        1,
      ]);
      expect(repository.save).toHaveBeenCalledWith({
        ...mockElectionBoard,
        constituencies: mockElectionBoard.constituencies,
      });
      expect(result).toEqual(mockElectionBoard);
    });

    it('should throw an error if ElectionBoard is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update(1, { constituenciesId: [{ id: 1 }] }),
      ).rejects.toThrow('ElectionBoard not found');
    });

    it('should throw an error if constituencies are not found', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockElectionBoard as ElectionBoard);
      jest
        .spyOn(service['constituencyService'], 'findByIds')
        .mockResolvedValue([]);

      await expect(
        service.update(1, { constituenciesId: [{ id: 1 }] }),
      ).rejects.toThrowError(new Error('Constituencies not found'));
    });
  });
});
