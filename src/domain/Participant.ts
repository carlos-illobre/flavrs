import { sumBy, partition } from 'lodash';
import { Card } from "./Card";

export abstract class Participant {
  private cards: Card[] = [];

  reset(): void {
    this.cards = [];
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  get points(): number {
    const [ases, nonAses] = partition(this.cards, card => card.isAs);
    const partialPoints = sumBy(nonAses, card => card.points);
    switch (ases.length) {
    case 0:
      return partialPoints;
    case 1:
      return partialPoints + 11 > 21 ? partialPoints + 1 : partialPoints + 11;
    case 2:
      return partialPoints === 0 ? 21 : partialPoints + 2;
    default:
      return partialPoints + ases.length;
    }
  }

  get hasNaturalBlackjack() {
    return this.cards.length === 2 && (
      this.cards[0].isAs && this.cards[1].isTenCard
        || this.cards[1].isAs && this.cards[0].isTenCard
    );
  }

}