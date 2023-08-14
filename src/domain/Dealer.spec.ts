import { BlackjackListener, LoseEvent, NaturalBlackjackEvent, StandoffEvent } from "./BlackjackListener";
import { Card, CardRank, CardSuite } from "./Card";
import { Dealer } from "./Dealer";
import { Player } from "./Player";

describe('Dealer',  () => {
  it('pay natural blackjack', () => {
    const chips = 300;
    const bet = 50;
    const listener = { handle: jest.fn(() => {}) } as unknown as BlackjackListener;
    const dealer = new Dealer(1, 0);
    const player = new Player('name', chips, listener);
    player.placeBet(bet);
    player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
    player.addCard(new Card(CardRank.QUEEN, CardSuite.CLUB));
    dealer.addCard(new Card(CardRank.FIVE, CardSuite.CLUB));
    dealer.addCard(new Card(CardRank.QUEEN, CardSuite.CLUB));
    const noWinners = dealer.payNaturalBlackjack([player]);
    expect(noWinners).toHaveLength(0);
    expect(player.getChips()).toBe(chips + bet + Math.ceil(bet/2));
    expect(player.getBet()).toBe(0);
    expect(player.getCards()).toHaveLength(0);
    expect(listener.handle).toBeCalledTimes(1);
    expect(listener.handle).toHaveBeenCalledWith(expect.any(NaturalBlackjackEvent));
  });

  it('collect bets from losers', () => {
    const chips = 300;
    const bet = 50;
    const listener = { handle: jest.fn(() => {}) } as unknown as BlackjackListener;
    const dealer = new Dealer(1, 0);
    const player = new Player('name', chips, listener);
    player.placeBet(bet);
    player.addCard(new Card(CardRank.FIVE, CardSuite.CLUB));
    player.addCard(new Card(CardRank.QUEEN, CardSuite.CLUB));
    dealer.addCard(new Card(CardRank.AS, CardSuite.CLUB));
    dealer.addCard(new Card(CardRank.QUEEN, CardSuite.CLUB));
    const noWinners = dealer.payNaturalBlackjack([player]);
    expect(noWinners).toHaveLength(0);
    expect(player.getChips()).toBe(chips - bet);
    expect(player.getBet()).toBe(0);
    expect(player.getCards()).toHaveLength(0);
    expect(listener.handle).toBeCalledTimes(1);
    expect(listener.handle).toHaveBeenCalledWith(expect.any(LoseEvent));
  });

  it('give back chips when stand off', () => {
    const chips = 300;
    const bet = 50;
    const listener = { handle: jest.fn(() => {}) } as unknown as BlackjackListener;
    const dealer = new Dealer(1, 0);
    const player = new Player('name', chips, listener);
    player.placeBet(bet);
    player.addCard(new Card(CardRank.AS, CardSuite.CLUB));
    player.addCard(new Card(CardRank.QUEEN, CardSuite.CLUB));
    dealer.addCard(new Card(CardRank.AS, CardSuite.CLUB));
    dealer.addCard(new Card(CardRank.QUEEN, CardSuite.CLUB));
    const noWinners = dealer.payNaturalBlackjack([player]);
    expect(noWinners).toHaveLength(0);
    expect(player.getChips()).toBe(chips);
    expect(player.getBet()).toBe(0);
    expect(player.getCards()).toHaveLength(0);
    expect(listener.handle).toBeCalledTimes(1);
    expect(listener.handle).toHaveBeenCalledWith(expect.any(StandoffEvent));
  });
});