// constituency.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ConstituencyService } from './constituency.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Constituency } from './entities/constituency.entity';
import { Repository } from 'typeorm';
import { VotingType } from '../types/voting-type.enum';

describe('ConstituencyService', () => {
  let service: ConstituencyService;
  let repository: Repository<Constituency>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConstituencyService,
        {
          provide: getRepositoryToken(Constituency),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ConstituencyService>(ConstituencyService);
    repository = module.get<Repository<Constituency>>(
      getRepositoryToken(Constituency),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of ConstituencyDTO if records exist', async () => {
      const mockConstituencies: Constituency[] = [
        {
          id: 1,
          constituencyNumber: 101,
          name: 'Constituency A',
          votingType: VotingType.CityCouncil,
          electionBoards: [],
          votingCard: null,
          candidates: [],
        },
        {
          id: 2,
          constituencyNumber: 102,
          name: 'Constituency B',
          votingType: VotingType.CityCouncil,
          electionBoards: [],
          votingCard: null,
          candidates: [],
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(mockConstituencies);

      const result = await service.findAll();

      expect(result).toEqual(mockConstituencies);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return empty list when there are no records', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when repository does', async () => {
      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.findAll()).rejects.toThrow('Database error');
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByIds', () => {
    it('should return list of Constituency if ids exist', async () => {
      const ids = [1, 2];
      const mockConstituencies: Constituency[] = [
        {
          id: 1,
          constituencyNumber: 101,
          name: 'Constituency A',
          votingType: VotingType.CityCouncil,
          electionBoards: [],
          votingCard: null,
          candidates: [],
        },
        {
          id: 2,
          constituencyNumber: 102,
          name: 'Constituency B',
          votingType: VotingType.CityCouncil,
          electionBoards: [],
          votingCard: null,
          candidates: [],
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(mockConstituencies);

      const result = await service.findByIds(ids);

      expect(result).toEqual(mockConstituencies);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          id: expect.anything(),
        },
      });

      expect.any(Function);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          id: expect.objectContaining({
            _value: ids,
          }),
        },
      });
    });

    it('should return empty list when there is no match with ids', async () => {
      const ids = [3, 4];
      const mockConstituencies: Constituency[] = [];

      jest.spyOn(repository, 'find').mockResolvedValue(mockConstituencies);

      const result = await service.findByIds(ids);

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          id: expect.anything(),
        },
      });
    });

    it('should return partial list when some of ids exist', async () => {
      const ids = [1, 3];
      const mockConstituencies: Constituency[] = [
        {
          id: 1,
          constituencyNumber: 101,
          name: 'Constituency A',
          votingType: VotingType.CityCouncil,
          electionBoards: [],
          votingCard: null,
          candidates: [],
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(mockConstituencies);

      const result = await service.findByIds(ids);

      expect(result).toEqual(mockConstituencies);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          id: expect.anything(),
        },
      });
    });

    it('should return empty list when ids are empty', async () => {
      const ids: number[] = [];
      const mockConstituencies: Constituency[] = [];

      jest.spyOn(repository, 'find').mockResolvedValue(mockConstituencies);

      const result = await service.findByIds(ids);

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          id: expect.anything(),
        },
      });
    });

    it('should throw an error when repository does', async () => {
      const ids = [1, 2];

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.findByIds(ids)).rejects.toThrow('Database error');
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          id: expect.anything(),
        },
      });
    });
  });
});
