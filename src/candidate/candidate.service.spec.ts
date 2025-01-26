import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { ElectionCommitteeService } from '../election-committee/election-committee.service';
import { Repository } from 'typeorm';

const mockCandidateRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockElectionCommitteeService = {
  findOne: jest.fn(),
};

describe('CandidateService', () => {
  let service: CandidateService;
  let candidateRepository: Repository<Candidate>;
  let electionCommitteeService: ElectionCommitteeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateService,
        {
          provide: getRepositoryToken(Candidate),
          useValue: mockCandidateRepository,
        },
        {
          provide: ElectionCommitteeService,
          useValue: mockElectionCommitteeService,
        },
      ],
    }).compile();

    service = module.get<CandidateService>(CandidateService);
    candidateRepository = module.get<Repository<Candidate>>(
      getRepositoryToken(Candidate),
    );
    electionCommitteeService = module.get<ElectionCommitteeService>(
      ElectionCommitteeService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of candidates with electionCommittee relation', async () => {
      const candidates = [{ id: 1, firstName: 'John', electionCommittee: {} }];
      mockCandidateRepository.find.mockResolvedValue(candidates);

      const result = await service.findAll();

      expect(candidateRepository.find).toHaveBeenCalledWith({
        relations: ['electionCommittee'],
      });
      expect(result).toEqual(candidates);
    });
  });

  describe('updateCommittee', () => {
    it('should update the election committee for a candidate', async () => {
      const candidate = { id: 1, electionCommittee: null };
      const electionCommittee = { id: 2 };

      mockCandidateRepository.findOne.mockResolvedValue(candidate);
      mockElectionCommitteeService.findOne.mockResolvedValue(electionCommittee);

      const updateDto = { electionCommitteeId: 2 };

      await service.updateCommittee(1, updateDto);

      expect(candidateRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(electionCommitteeService.findOne).toHaveBeenCalledWith(2);
      expect(candidateRepository.save).toHaveBeenCalledWith({
        ...candidate,
        electionCommittee,
      });
    });

    it('should set electionCommittee to null if electionCommitteeId is null', async () => {
      const candidate = { id: 1, electionCommittee: { id: 2 } };

      mockCandidateRepository.findOne.mockResolvedValue(candidate);

      const updateDto = { electionCommitteeId: null };

      await service.updateCommittee(1, updateDto);

      expect(candidateRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(electionCommitteeService.findOne).not.toHaveBeenCalled();
      expect(candidateRepository.save).toHaveBeenCalledWith({
        ...candidate,
        electionCommittee: null,
      });
    });

    it('should throw an error if the candidate does not exist', async () => {
      mockCandidateRepository.findOne.mockResolvedValue(null);

      const updateDto = { electionCommitteeId: 2 };

      await expect(service.updateCommittee(1, updateDto)).rejects.toThrow(
        'Candidate not found',
      );

      expect(candidateRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(candidateRepository.save).not.toHaveBeenCalled();
    });
  });
});
