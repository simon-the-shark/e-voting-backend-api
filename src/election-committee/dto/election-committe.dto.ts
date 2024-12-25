import { z } from 'zod';

export const ElectionCommitteeDto = z.object({
  id: z.number(),
  name: z.string(),
});

export type ElectionCommitteeDto = z.infer<typeof ElectionCommitteeDto>;
