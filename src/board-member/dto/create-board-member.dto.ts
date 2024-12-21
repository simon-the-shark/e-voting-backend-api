import { IsString } from 'class-validator';

export class CreateBoardMemberDto {
  @IsString()
  readonly pesel: string;
}
