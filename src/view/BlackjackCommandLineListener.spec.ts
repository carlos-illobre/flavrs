import { BlackjackCommandLineListener } from "./BlackjackCommandLineListener";
import { TerminalReader } from "./TerminalReader";
import { Card, CardRank, CardSuite } from '../domain/Card';

describe('Printer', () => {

  it('transforms some cards into a string', () => {
    const card1 = new Card(CardRank.AS, CardSuite.SPADE);
    const card2 = new Card(CardRank.TEN, CardSuite.DIAMOND);
    const printer = new BlackjackCommandLineListener();

    const expected = printer.stringifyCards([card1, card2]);
    
    expect(expected).toBe(`+---+ +---+\n|A ♠| |10♦|\n+---+ +---+`);
  });

  it('transforms some cards into a string with the last one face down', () => {
    const card1 = new Card(CardRank.AS, CardSuite.SPADE);
    const card2 = new Card(CardRank.TEN, CardSuite.DIAMOND);
    const printer = new BlackjackCommandLineListener();

    const expected = printer.stringifyCards([card1, card2], true);
    
    expect(expected).toBe(`+---+ +---+\n|A ♠| |###|\n+---+ +---+`);
  });
  
  it('asks how many players are at the table', async () => {
    const playersCount = 5;
    
    const terminalReaderMock = jest
      .spyOn(TerminalReader.prototype, 'readline')
      .mockImplementationOnce(async (_) => `${playersCount}`);
 
    const printer = new BlackjackCommandLineListener();
    const expected = await printer.askHowManyPlayers();
    
    expect(terminalReaderMock).toHaveBeenCalledTimes(1);
    expect(terminalReaderMock).toHaveBeenCalledWith('How many players are at the table? ');
    expect(expected).toBe(playersCount);
  });

});