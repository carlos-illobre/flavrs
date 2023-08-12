export enum CardSuite {
  SPADE = "\u2660",
  CLUB = "\u2663",
  HEART = "\u2665",
  DIAMOND = "\u2666",
}

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

export class Card {
  readonly rank: CardRank;
  readonly suite: CardSuite;

  constructor(rank: CardRank, suite: CardSuite) {
    this.rank = rank;
    this.suite = suite;
  }
}
