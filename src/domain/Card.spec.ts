import { Card, CardRank, CardSuite } from "./Card";

describe('Card', () => {
  it('returns true if the card is an AS', () => {
    const card = new Card(CardRank.AS, CardSuite.CLUB);
    expect(card.isAs).toBe(true);
  });
  
  it('returns false if the card is not an AS', () => {
    const card = new Card(CardRank.EIGTH, CardSuite.CLUB);
    expect(card.isAs).toBe(false);
  });
});