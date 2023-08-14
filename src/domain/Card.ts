export enum CardSuite {
  SPADE = "\u2660",
  CLUB = "\u2663",
  HEART = "\u2665",
  DIAMOND = "\u2666",
}
export const CardSuiteArray = Object.freeze([
  CardSuite.SPADE,
  CardSuite.CLUB,
  CardSuite.HEART,
  CardSuite.DIAMOND
]);

export enum CardRank {
  AS = 'A',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGTH = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
}

export const CardRankValues = Object.freeze({
  [CardRank.AS]: 1,
  [CardRank.TWO]: 2,
  [CardRank.THREE]: 3,
  [CardRank.FOUR]: 4,
  [CardRank.FIVE]: 5,
  [CardRank.SIX]: 6,
  [CardRank.SEVEN]: 7,
  [CardRank.EIGTH]: 8,
  [CardRank.NINE]: 9,
  [CardRank.TEN]: 10,
  [CardRank.JACK]: 10,
  [CardRank.QUEEN]: 10,
  [CardRank.KING]: 10
});

export class Card {
  readonly rank: CardRank;
  readonly suite: CardSuite;

  constructor(rank: CardRank, suite: CardSuite) {
    this.rank = rank;
    this.suite = suite;
  }

  get hashCode(): string {
    return `${this.rank}${this.suite}`;
  }

  get points(): number {
    return CardRankValues[this.rank];
  }

  get isAs(): boolean {
    return this.rank === CardRank.AS;
  }

  get isTenCard(): boolean {
    return this.rank === CardRank.TEN 
      || this.rank === CardRank.JACK 
      || this.rank === CardRank.QUEEN
      || this.rank === CardRank.KING;
  }
}
