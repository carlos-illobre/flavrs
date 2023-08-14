import { range } from 'lodash';
import { Player } from './Player';
import { BlackjackListener, StartGameEvent, ShowCardsEvent } from './BlackjackListener';
import { Dealer } from './Dealer';

export class Game {

  /**
   * Starts the game
   */
  async start(listener: BlackjackListener): Promise<void> {
    const INITIAL_CHIPS_PER_PLAYER = 1000;
    const DECK_COUNT = 6;
    const MINIMUN_BET = 2;
    const MAXIMUN_BET = 500;

    listener.handle(new StartGameEvent());
    
    // The game starts asking now many players are at the table
    const playersCount = await listener.askHowManyPlayers();
    
    // Each player starts with $1000
    const players = this.createPlayers(playersCount, INITIAL_CHIPS_PER_PLAYER, listener);
    
    // Before the deal begins, each player places a bet in chips. Minimum and maximum limits are from $2 to $500
    await this.getBetsFromPlayers(listener, players, MINIMUN_BET, MAXIMUN_BET);

    // The six deck game with 52 cards each is used (312 cards)
    // The dealer shuffles all the cards. The last 60 to 75 cards or so will not be used
    const dealer = new Dealer(DECK_COUNT, Math.floor(Math.random() * (75 - 60 + 1) + 60));

    // When all the players have placed their bets, the dealer gives one card face up to each player
    dealer.giveOneCardToEachPlayer(players);
    dealer.receiveCard();

    // Another round of cards is then dealt face up to each player,
    dealer.giveOneCardToEachPlayer(players);
    // but the dealer takes the second card face down
    dealer.receiveCard(true);

    listener.handle(new ShowCardsEvent(players, dealer));

    // If any player has a natural and the dealer does not 
    // the dealer immediately pays that player one and a half times the amount of their bet
    const noWinners = dealer.payNaturalBlackjack(players);

    if (noWinners.length) {
      dealer.faceUpCard();
      listener.handle(new ShowCardsEvent(noWinners, dealer));
    }
  }

  createPlayers(playersCount: number, chipsPerPLayer: number, listener: BlackjackListener): Player[] {
    return range(playersCount)
      .map((_, index) => new Player(`${index+1}`, chipsPerPLayer, listener));
  }

  getBetsFromPlayers(presenter: BlackjackListener, players: Player[], minimumBet: number, maximunBet: number): Promise<void> {
    return players.reduce(async (prev, player) => {
      await prev;
      const bet = await presenter.askForBet(player, answer => {
        const bet = parseInt(answer);
        player.validateBet(bet, minimumBet, maximunBet);
        return bet;
      });
      player.placeBet(bet);
    }, Promise.resolve());
  }


}