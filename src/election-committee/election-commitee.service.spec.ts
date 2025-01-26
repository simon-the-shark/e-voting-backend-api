import { Test, TestingModule } from '@nestjs/testing';
import { ElectionCommitteeService } from './election-committee.service';
import { Repository } from 'typeorm';
import { ElectionCommittee } from './entities/elecition-committee.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserMessageService } from '../user-message/user-message.service';

describe('ElectionCommitteeService', () => {
  let service: ElectionCommitteeService;
  let repository: Repository<ElectionCommittee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectionCommitteeService,
        {
          provide: getRepositoryToken(ElectionCommittee),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: UserMessageService,
          useValue: {
            createMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ElectionCommitteeService>(ElectionCommitteeService);
    repository = module.get<Repository<ElectionCommittee>>(
      getRepositoryToken(ElectionCommittee),
    );
  });

  describe('findAll', () => {
    it('should return all election committees', async () => {
      const committees = [
        { id: 1, name: 'Committee A', candidates: [] },
        { id: 2, name: 'Committee B', candidates: [] },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(committees);

      const result = await service.findAll();

      expect(result).toEqual(committees);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no committees are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single election committee by id', async () => {
      const committee = { id: 1, name: 'Committee A', candidates: [] };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(committee);

      const result = await service.findOne(1);

      expect(result).toEqual(committee);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null when no committee is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });
});
