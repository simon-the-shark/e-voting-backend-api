import { IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  readonly party: string | null;

  readonly electionProgram: string | null;
}
