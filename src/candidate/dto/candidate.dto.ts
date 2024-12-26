import { ElectionCommitteeDto } from 'src/election-committee/dto/election-committe.dto';
import { z } from 'zod';

export const CandidateDto = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  party: z.string(),
  electionProgram: z.string(),
  electionCommittee: ElectionCommitteeDto.nullable(),
});

export type CandidateDto = z.infer<typeof CandidateDto>;
