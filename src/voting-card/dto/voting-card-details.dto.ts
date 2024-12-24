import { VotingTypeZod } from 'src/types/voting-type.enum';
import { z } from 'zod';

export const VotingCardDto = z.object({
  id: z.number(),
  year: z.number(),
  votingType: VotingTypeZod,
  instriuctions: z.string(),
  title: z.string(),
  hasVoted: z.boolean(),
});

export type VotingCardDto = z.infer<typeof VotingCardDto>;
