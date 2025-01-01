import { Constituency } from 'src/constituency/entities/constituency.entity';
import { VotingType } from 'src/types/voting-type.enum';

export class CreateVotingCardDTO {
  votingType: VotingType;
  title: string;
  year: number;
  constituency: Constituency;
  instriuctions: string;
}
