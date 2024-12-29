import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ConstituencyService } from 'src/constituency/constituency.service';
import { UserMessageService } from 'src/user-message/user-message.service';
import { VotingCardService } from 'src/voting-card/voting-card.service';

@Injectable()
export class ScheduledTaskService {
  constructor(
    private readonly constituencyService: ConstituencyService,
    private readonly votingCardService: VotingCardService,
    private readonly userMessageService: UserMessageService,
  ) {}

  @Interval(10000)
  async createAndVerifyVotingCardsForConstituencies() {
    const year = new Date(Date.now()).getFullYear();
    const constituencies =
      await this.constituencyService.findAllWithRelations();
    for (const constituency of constituencies) {
      const { candidates, votingType } = constituency;
      const existing =
        await this.votingCardService.findByYearAndVotingTypeAndConstituency({
          year,
          votingType,
          constituency,
        });
      if (existing !== undefined && existing !== null) {
        console.log(`Taka karta juz instnieje: ${existing.id}`);
        continue;
      }
      const votingCard = await this.votingCardService.create({
        votingType,
        title: `Głosowanie na ${votingType}`,
        year,
        constituency,
        instriuctions:
          'Aby oddać głos, zaznacz jednego kandyta. Mozesz jednak oddac tez głos niewazny.',
      });
      await this.votingCardService.shuffleCandidates(votingCard, candidates);
      console.log(
        `Poprawnie utworzono kartę do głosowania id: ${votingCard.id} z ${votingCard.cardAssignment.length} kandydatami`,
      );
      const verifyCard =
        await this.constituencyService.verifyVotingCardRules(constituency);
      if (verifyCard) {
        await this.userMessageService.createMessageForAllAdmins({
          message: `Poprawnie utworzono kartę do głosowania id: ${votingCard.id} z ${votingCard.cardAssignment.length} kandydatami`,
          isDangerous: false,
        });
      } else {
        await this.userMessageService.createMessageForAllAdmins({
          message: `Utworzono kartę do głosowania id: ${votingCard.id}; ale nie spełnia wymaganych reguł. Zweryfikuj i popraw ręcznie`,
          isDangerous: true,
        });
      }
    }
  }
}
