import { BlackjackListener } from './BlackjackListener';
import { Card, CardRank, CardSuite } from './Card';
import { BetException, Player } from './Player';

describe('Player', () => {

  describe('bet', () => {
    it('should make a bet', () => {
      const listener = {} as BlackjackListener;
      const chips = 200;
      const bet = 50;
      const player = new Player('name', chips, listener);

      player.placeBet(bet);

      expect(player.getBet()).toBe(bet);
      expect(player.getChips()).toBe(chips - bet);
    });

    it('should not make a bet if the bet is bigger than the chips', () => {
      const listener = {} as BlackjackListener;
      const chips = 200;
      const bet = 500;
      const player = new Player('name', chips, listener);

      expect(() => { player.placeBet(bet); }).toThrow(BetException);
    });
  });

  describe('points', () => {
    it('shoud hit 21 points with only 2 AS', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      expect(player.points).toBe(21);
    });

    it('shoud hit 12 points with only 2 AS', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.KING, CardSuite.CLUB));
      expect(player.points).toBe(12);
    });

    it('shoud hit 21 points with 1 AS and two face cards', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.KING, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.JACK, CardSuite.DIAMOND));
      expect(player.points).toBe(21);
    });

    it('shoud hit 21 points with 1 AS and one face cards', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.JACK, CardSuite.DIAMOND));
      expect(player.points).toBe(21);
    });

    it('shoud hit 20 points with 1 AS and a nine', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.NINE, CardSuite.DIAMOND));
      expect(player.points).toBe(20);
    });

    it('shoud hit 19 points with 1 AS and two nines', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.NINE, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.NINE, CardSuite.DIAMOND));
      expect(player.points).toBe(19);
    });

    it('shoud hit 18 points if there are no AS', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.NINE, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.NINE, CardSuite.DIAMOND));
      expect(player.points).toBe(18);
    });

    it('shoud hit 3 points with only 3 AS', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      expect(player.points).toBe(3);
    });

    it('shoud hit 5 points with only 5 AS', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      expect(player.points).toBe(5);
    });

    it('shoud hit 13 points with 3 AS plus a K', () => {
      const listener = {} as BlackjackListener;
      const player = new Player('name', 1000, listener);
      player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.AS, CardSuite.DIAMOND));
      player.addCard(new Card(CardRank.KING, CardSuite.DIAMOND));
      expect(player.points).toBe(13);
    });
  });
});