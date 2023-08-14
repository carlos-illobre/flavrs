import { partition } from 'lodash';
import { Deck, ShuffleCardsIterator } from "./Deck";
import { Participant } from "./Participant";
import { Player } from "./Player";

export class Dealer extends Participant {
  private readonly deckIterator: ShuffleCardsIterator;
  private cardFaceDown: boolean = false;
  
  constructor(deckCount: number, cardsToNotBeUsed: number) {
    super();
    this.deckIterator = new Deck(deckCount).getIterator(cardsToNotBeUsed);
  }

  giveOneCardToEachPlayer(players: Player[]): void {
    players.map(player => player.addCard(this.deckIterator.next()));
  }

  receiveCard(faceDown: boolean = false): void {
    this.addCard(this.deckIterator.next());
    this.cardFaceDown = faceDown;
  }

  get isCardFaceDown(): boolean {
    return this.cardFaceDown;
  }

  faceUpCard(): void {
    this.cardFaceDown = false;
  }

  get points(): number {
    return this.isCardFaceDown ? this.getCards()[0].points : super.points;
  }

  /**
   * Pay the chips to the winners and collect the btes from the losers
   * @param players 
   * @returns The players who are not winners neither losers and keep playing this round
   */
  payNaturalBlackjack(players: Player[]): Player[] {
    const [winners, noWinners] = partition(players, player => player.hasNaturalBlackjack);
    // If any player has a natural and the dealer does not 
    // the dealer immediately pays that player one and a half times the amount of their bet
    if (!this.hasNaturalBlackjack) {
      winners.map(player => player.checkNaturalBlackjack());
    } else {
      // If the dealer has a natural, they immediately collect the bets of all players who do not have naturals, (but no additional amount).
      noWinners.map(player => player.lose());
      // If the dealer and another player both have naturals, the bet of that player is a stand-off (a tie), and the player takes back his chips.
      winners.map(player => player.standoff());
    }
    return this.hasNaturalBlackjack ? [] : noWinners;
  }
}