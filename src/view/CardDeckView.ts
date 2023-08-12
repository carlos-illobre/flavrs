import { Card, CardRank } from '../domain/Card';

export class CardDeckView {
  toString(card: Card) {
    return `
      +---+
      |${card.rank}${card.rank == CardRank.TEN ? '' : ' '}${card.suite}|
      +---+
    `;
  }
}