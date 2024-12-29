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

      if (!candidates || candidates.length === 0) {
        await this.userMessageService.createMessageForAllAdmins({
          message: `Błąd generacji karty do głosowania. Wykryto brak kandydatów w okręgu id: ${constituency.id}`,
          isDangerous: true,
          indetifier: `error-0-candidates-in-id-${constituency.id}`,
        });
        console.log('Brak kandydatów w okręgu');
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
      const newCard = await this.votingCardService.shuffleCandidates(
        votingCard,
        candidates,
      );
      const verifyCard =
        await this.constituencyService.verifyVotingCardRules(constituency);
      if (verifyCard) {
        await this.userMessageService.createMessageForAllAdmins({
          message: `Poprawnie utworzono kartę do głosowania id: ${votingCard.id} z ${newCard.cardAssignment.length} kandydatami`,
          isDangerous: false,
          indetifier: `success-voting-card-creation-votingCardId-${votingCard.id}-len-${newCard.cardAssignment.length}`,
        });
        console.log(
          `Poprawnie utworzono kartę do głosowania id: ${votingCard.id} z ${newCard.cardAssignment.length} kandydatami`,
        );
      } else {
        await this.userMessageService.createMessageForAllAdmins({
          message: `Utworzono kartę do głosowania id: ${votingCard.id}; ale nie spełnia wymaganych reguł. Zweryfikuj i popraw ręcznie`,
          isDangerous: true,
          indetifier: `not-so-success-voting-card-creation-votingCardId-${votingCard.id}`,
        });
        console.log(
          `Niepoprawnie utworzono kartę do głosowania id: ${votingCard.id}`,
        );
      }
    }
  }
}
