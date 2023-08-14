import { Card, CardRankValues, CardSuiteArray } from './Card';
import { chain, range, shuffle } from 'lodash';

export class Deck {
  private readonly MAX = 13;
  private readonly cards: Card[];

  constructor(deckCount: number) {
    const ranks = chain(Object.keys(CardRankValues))
      .reduce((prev, rank, index) => {
        prev.set(index, rank);
        return prev;
      }, new Map())
      .value();
    this.cards = chain(range(deckCount))
      .map(_ => {
        return CardSuiteArray.reduce((prev, item) => {
          return chain(range(this.MAX))
            .map((_, index) => new Card(ranks.get(index), item))
            .concat(prev)
            .value();
        }, [] as Card[]);
      })
      .flatten()
      .value();
  }

  getIterator(cardsToNotBeUsed: number): ShuffleCardsIterator {
    return new ShuffleCardsIterator(this.cards, cardsToNotBeUsed);
  }
}

export class ShuffleCardsIterator {
  private readonly cards: Card[];
  private index: number = 0;
  private readonly cardsToNotBeUsed;

  constructor(cards: Card[], cardsToNotBeUsed: number) {
    this.cardsToNotBeUsed = cardsToNotBeUsed;
    this.cards = shuffle(cards);
  }

  hasNext(): boolean {
    return this.index < this.cards.length - this.cardsToNotBeUsed;
  }

  next(): Card {
    return this.cards[this.index++];
  }
}