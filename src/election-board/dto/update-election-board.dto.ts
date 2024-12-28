import { IsArray } from 'class-validator';

export class ConstituencyIdDto {
  id: number;
}

export class UpdateElectionBoardDto {
  @IsArray()
  constituenciesId: ConstituencyIdDto[];
}
