import { CardRank } from '../domain/Card';
import { TerminalReader } from './TerminalReader';
import { BetException, Player } from '../domain/Player';
import { Card } from '../domain/Card';
import { BlackjackListener } from '../domain/BlackjackListener';
import { Dealer } from '../domain/Dealer';

/**
 * Text based representation of the full blackjac game
 */
export class BlackjackCommandLineListener extends BlackjackListener {

  private readonly terminalReader = new TerminalReader;

  handleStartGame(): void {
    console.log('Welcome to Blackjack');
    console.log();
  }

  askHowManyPlayers(): Promise<number> {
    return this.terminalReader.keepReadingUntilNaturalNumber('How many players are at the table? ', 'Enter a number higher than zero: ');
  }

  askForBet(player: Player, condition: (answer :string) => number): Promise<number> {
    return this.terminalReader.keepReadingUntil(
      `Player ${player.name} has $${player.getChips()} chips, make a bet: `,
      (answer) => {
        try {
          return condition(answer);
        } catch (err) {
          if (err instanceof BetException) {
            throw new Error(`The minimum amount is ${err.minimumBet} chips, the maximun amount is ${err.maximumBet} chips and your chips are ${err.chips}: `);
          } else {
            throw new Error('Enter a valid value: ');
          }
        }
      }
    );
  }

  stringifyCards(cards: Card[], withFaceDown: boolean = false): string {
    const border = cards.map(_ => '+---+').join(' ');
    const content = cards.map((card, index, array) => {
      return withFaceDown && index === array.length-1
        ? `|###|` 
        : `|${card.rank}${card.rank == CardRank.TEN ? '' : ' '}${card.suite}|`;
    }).join(' ');
    return `${border}\n${content}\n${border}`;
  }

  handleShowCards(players: Player[], dealer: Dealer): void {
    players.map(player => {
      console.log(`Player ${player.name} chips: ${player.getChips()} bet: ${player.getBet()}`);
      console.log(this.stringifyCards(player.getCards()));
      console.log(`Points: ${player.points}`);
      console.log();
    });
    console.log(`Dealer: `);
    console.log(this.stringifyCards(dealer.getCards(), dealer.isCardFaceDown));
    console.log(`Points: ${dealer.points}`);
    console.log();
  }

  handleNaturalBlackjack(player: Player, earnings: number, cards: Card[]): void {
    console.log(`Player ${player.name} won ${earnings}. Chips: ${player.getChips()}`);
    console.log(this.stringifyCards(cards));
  }

  handleLost(player: Player, lose: number, cards: Card[]): void {
    console.log(`Player ${player.name} lost ${lose}. Chips: ${player.getChips()}`);
    console.log(this.stringifyCards(cards));
  }

  handleStandoff(player: Player, cards: Card[]): void {
    console.log(`Player ${player.name} stand-off, getting back the chips. Chips: ${player.getChips()}`);
    console.log(this.stringifyCards(cards));
  }
}