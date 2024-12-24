import { Candidate } from 'src/candidate/entities/candidate.entity';
import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  votingCardId: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  candidates: Candidate[];
}
