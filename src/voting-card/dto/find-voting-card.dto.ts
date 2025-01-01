import { Constituency } from 'src/constituency/entities/constituency.entity';
import { VotingType } from 'src/types/voting-type.enum';

export class FindVotingCardDto {
  year: number;
  votingType: VotingType;
  constituency: Constituency;
}
