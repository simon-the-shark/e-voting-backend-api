import { IsInt, IsPositive } from 'class-validator';

export class UpdateCandidateCommitteeDto {
  @IsInt()
  @IsPositive()
  readonly electionCommitteeId: number;
}
