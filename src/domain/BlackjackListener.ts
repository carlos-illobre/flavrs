import { Card } from "./Card";
import { Dealer } from "./Dealer";
import { Player } from "./Player";

export abstract class BlackjackListener {

  /**
   * ask for the amount of players
   */
  abstract askHowManyPlayers(): Promise<number>;

  /**
   * Ask a player for a bet
   * @param player contains the player indentification
   * @param condition a function to evaluate if the bet is valid. 
   * It throws an exception if it is not valid and return the bet if it is valid
   */
  abstract askForBet(player: Player, condition: (answer: string) => number): Promise<number>;


  handle(event: BlackjackEvent): void {
    if (event instanceof StartGameEvent) {
      this.handleStartGame();
    }
    if (event instanceof ShowCardsEvent) {
      this.handleShowCards(event.players, event.dealer);
    }
    if (event instanceof NaturalBlackjackEvent) {
      this.handleNaturalBlackjack(event.player, event.earnings, event.cards);
    }
    if (event instanceof LoseEvent) {
      this.handleLost(event.player, event.lose, event.cards);
    }
    if (event instanceof StandoffEvent) {
      this.handleStandoff(event.player, event.cards);
    }
  }

  /**
   * show the the presentation screen
   */
  abstract handleStartGame(): void;
  /**
   * Print all the cards of the participats
   * @param players
   * @param dealer 
   */
  abstract handleShowCards(players: Player[], dealer: Dealer): void
  abstract handleNaturalBlackjack(player: Player, earnings: number, cards: Card[]): void
  abstract handleLost(player: Player, lose: number, cards: Card[]): void
  abstract handleStandoff(player: Player, cards: Card[]): void
}

export abstract class BlackjackEvent {}

export class StartGameEvent extends BlackjackEvent {}

export class ShowCardsEvent extends BlackjackEvent {
  readonly players: Player[];
  readonly dealer: Dealer;
  constructor(players: Player[], dealer: Dealer) {
    super();
    this.players = players;
    this.dealer = dealer;
  }
}

export class NaturalBlackjackEvent extends BlackjackEvent {
  readonly player: Player;
  readonly earnings: number;
  readonly cards: Card[];
  constructor(player: Player, earnings: number, cards: Card[]) {
    super();
    this.player = player;
    this.earnings = earnings;
    this.cards = cards;
  }
}

export class LoseEvent extends BlackjackEvent {
  readonly player: Player;
  readonly lose: number;
  readonly cards: Card[];
  constructor(player: Player, lose: number, cards: Card[]) {
    super();
    this.player = player;
    this.lose = lose;
    this.cards = cards;
  }

}

export class StandoffEvent extends BlackjackEvent {
  readonly player: Player;
  readonly cards: Card[];
  constructor(player: Player, cards: Card[]) {
    super();
    this.player = player;
    this.cards = cards;
  }
}