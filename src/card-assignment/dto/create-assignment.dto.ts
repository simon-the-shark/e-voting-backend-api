import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Candidate } from 'src/candidate/entities/candidate.entity';

export class CreateAssignmentDto {
  @IsNotEmpty()
  candidate: Candidate;
  @IsInt()
  @IsPositive()
  numberOnCard: number;
}
