import { BlackjackListener } from "./BlackjackListener";
import { Game } from "./Game";
import { fill } from "lodash";
import { Player } from "./Player";

describe('Game', () => {

  it('should create all the players with the initial amount of chips', () => {
    const listener = {} as unknown as BlackjackListener;
    const playerCount = 4;
    const chips = 200;
    const game = new Game();

    const players = game.createPlayers(playerCount, chips, listener);

    expect(players).toHaveLength(playerCount);
    expect(players.map(player => player.getChips()))
      .toEqual(expect.arrayContaining(fill([], chips)));
  });

  it('should accept a bet', async () => {
    const bet = 10;
    const minimunBet = 20;
    const maximunBet = 100;
    const game = new Game();
      
    const presenterMock = {
      askForBet: jest.fn(() => Promise.resolve(bet))
    } as unknown as BlackjackListener;

    const playerMock = {
      placeBet: jest.fn(() => {})
    } as unknown as Player;

    await game.getBetsFromPlayers(presenterMock, [playerMock], minimunBet, maximunBet);

    expect(presenterMock.askForBet).toBeCalledTimes(1);
    expect(presenterMock.askForBet).toHaveBeenCalledWith(playerMock, expect.any(Function));
    expect(playerMock.placeBet).toBeCalledTimes(1);
    expect(playerMock.placeBet).toHaveBeenCalledWith(bet);
  });

});