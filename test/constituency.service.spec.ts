import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstituencyService } from 'src/constituency/constituency.service';
import { Constituency } from 'src/constituency/entities/constituency.entity';
import { VotingType } from 'src/types/voting-type.enum';

const mockConstituencies: Constituency[] = [
  {
    id: 1,
    constituencyNumber: 101,
    name: 'Constituency A',
    votingType: VotingType.CommuneHead,
    electionBoards: [],
    votingCard: null,
    candidates: [],
  },
  {
    id: 2,
    constituencyNumber: 102,
    name: 'Constituency B',
    votingType: VotingType.Mayor,
    electionBoards: [],
    votingCard: null,
    candidates: [],
  },
];

const mockRepository = () => ({
  find: jest.fn().mockResolvedValue(mockConstituencies),
});

describe('ConstituencyService', () => {
  let service: ConstituencyService;
  let repository: Repository<Constituency>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConstituencyService,
        {
          provide: getRepositoryToken(Constituency),
          useFactory: mockRepository,
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
    it('should return an array of ConstituencyDto', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockConstituencies);
    });
  });
});
