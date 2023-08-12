import { Card, CardSuite, CardRank } from '../domain/Card';
import { CardDeckView } from './CardDeckView';

describe('CardDeckView',  () => {

  it('transforms a card into a string', () => {
    const card = new Card(CardRank.AS, CardSuite.SPADE);
    const deck = new CardDeckView();
  
    expect(deck.toString(card)).toBe(`
      +---+
      |A ♠|
      +---+
    `);
  });

  it('transforms 10 of diamond into a string', () => {
    const card = new Card(CardRank.TEN, CardSuite.DIAMOND);
    const deck = new CardDeckView();
  
    expect(deck.toString(card)).toBe(`
      +---+
      |10♦|
      +---+
    `);
  });
});