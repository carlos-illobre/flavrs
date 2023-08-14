import { TerminalReader } from "./TerminalReader";

describe('Terminal reader', () => {
  it('should keep asking for a value if the answer is not an integer', async () => {
    const prompt = 'some prompt';
    const errorPrompt = 'error prompt';
    const answers = [
      'not a number',
      '-1',
      '1.1',
      '0',
      '3'
    ]; 

    const terminalReader = new TerminalReader();

    terminalReader.readline = jest.fn((() => {
      let i = 0;
      return () => {
        return Promise.resolve(answers[i++]);
      };
    })());

    const result = await terminalReader.keepReadingUntilNaturalNumber(prompt, errorPrompt);

    expect(result).toBe(parseInt(answers[answers.length-1]));
    expect(terminalReader.readline).toBeCalledTimes(answers.length);
    answers.map((_, index) => {
      expect(terminalReader.readline).toHaveBeenNthCalledWith(index + 1, index === 0 ? prompt : errorPrompt);
    });
  });
});