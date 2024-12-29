import { IsInt, IsPositive } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  @IsPositive()
  votingCardId: number;

  @IsInt()
  @IsPositive()
  candidateId: number;

  @IsInt()
  @IsPositive()
  numberOnCard: number;
}
