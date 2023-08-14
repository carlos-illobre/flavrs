import { isInteger } from 'lodash';
import { Participant } from './Participant';
import { BlackjackListener, BlackjackEvent, NaturalBlackjackEvent, LoseEvent, StandoffEvent } from './BlackjackListener';

export class Player extends Participant {

  readonly name: string;
  private chips: number;
  private bet: number = 0;
  private listener: BlackjackListener;

  constructor(name: string, chips: number, listener: BlackjackListener) {
    super();
    this.name = name;
    this.chips = chips;
    this.listener = listener;
  }

  emit(event: BlackjackEvent) {
    this.listener.handle(event);
  }

  getChips() {
    return this.chips;
  }

  validateBet(bet: number, min: number, max: number): void {
    if (!isInteger(bet) || bet < min || bet > max || bet > this.chips) {
      throw new BetException(bet, this.chips, min, max);
    }
  }

  placeBet(bet: number): void {
    this.validateBet(bet, 1, this.chips);
    this.bet += bet;
    this.chips -= bet;
  }

  getBet(): number {
    return this.bet;
  }

  reset(): void {
    this.bet = 0;
    super.reset();    
  }

  /**
   * If any player has a natural and the dealer does not, the dealer immediately pays that player one and a half times the amount of their bet
   */
  checkNaturalBlackjack(): void {
    if (this.hasNaturalBlackjack) {
      const earnings = this.bet + Math.ceil(this.bet/2);
      this.chips += this.bet + earnings;
      this.emit(new NaturalBlackjackEvent(this, earnings, this.getCards()));
      this.reset();
    }
  }

  lose(): void {
    this.emit(new LoseEvent(this, this.bet, this.getCards()));
    this.reset();
  }

  standoff(): void {
    this.chips += this.bet;
    this.emit(new StandoffEvent(this, this.getCards()));
    this.reset();
  }

}

export class BetException extends Error {
  readonly bet: number;
  readonly chips: number;
  readonly minimumBet: number;
  readonly maximumBet: number;
  constructor(bet: number, chips: number, maximumBet: number, minimumBet: number) {
    super();
    this.bet = bet;
    this.chips = chips;
    this.minimumBet = minimumBet;
    this.maximumBet = maximumBet;
  }
}