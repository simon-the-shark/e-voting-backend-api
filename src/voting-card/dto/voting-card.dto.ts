import { z } from 'zod';
import { VotingTypeZod } from 'src/types/voting-type.enum';

const CandidateSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  party: z.string(),
  electionProgram: z.string(),
});

const CardAssignmentSchema = z.object({
  numberOnCard: z.number(),
  candidate: CandidateSchema,
});

export const VotingCardDetailsDto = z.object({
  id: z.number(),
  year: z.number(),
  votingType: VotingTypeZod,
  instriuctions: z.string(),
  title: z.string(),
  cardAssignment: z.array(CardAssignmentSchema),
  hasVoted: z.boolean(),
});

export type VotingCardDetailsDto = z.infer<typeof VotingCardDetailsDto>;
