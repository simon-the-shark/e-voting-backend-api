import { IsString } from 'class-validator';

export class CreateCommitteeMemberDto {
  @IsString()
  readonly pesel: string;
}
