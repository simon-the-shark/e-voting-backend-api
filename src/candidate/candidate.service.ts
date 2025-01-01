import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { UpdateCandidateCommitteeDto } from './dto/update-candidate-committee.dto';
import { ElectionCommitteeService } from 'src/election-committee/election-committee.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private readonly electionCommitteeService: ElectionCommitteeService,
  ) {}

  async findAll(): Promise<Candidate[]> {
    return await this.candidateRepository.find({
      relations: ['electionCommittee'],
    });
  }

  async updateCommittee(
    id: number,
    updateCandidateCommitteeDto: UpdateCandidateCommitteeDto,
  ) {
    const { electionCommitteeId } = updateCandidateCommitteeDto;
    const committe = electionCommitteeId
      ? await this.electionCommitteeService.findOne(electionCommitteeId)
      : null;
    const candidate = await this.candidateRepository.findOne({
      where: { id },
    });
    candidate.electionCommittee = committe;
    await this.candidateRepository.save(candidate);
  }
}
