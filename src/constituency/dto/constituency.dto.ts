import { Transform } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum } from 'class-validator';
import { VotingType } from 'src/types/voting-type.enum';

export class ConstituencyDto {
  readonly name: string;
  readonly number: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Transform(({ value }) => value.map((type: string) => type.toLowerCase()))
  @IsEnum(VotingType)
  readonly votingType: VotingType;
}
