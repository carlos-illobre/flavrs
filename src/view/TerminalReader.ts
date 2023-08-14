import * as readline from 'readline';

/**
 * Is the console manager to read text from the terminal
 */
export class TerminalReader {

  /**
   * Reads a line from standard input
   * @param prompt The message to print 
   * @returns the input
   */
  async readline(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(prompt, (answer) => {
        try {
          resolve(answer); 
        } catch(error) {
          reject(error);
        } finally {
          rl.close(); 
        }
      });
    });
  }

  /**
   * Reads a value from the console until a condition is valid
   * @param prompt The message to ask a question
   * @param condition The function to check a condition. If it throws an error the condition is false,
   * else the condition is true. The error message will be the prompt of the following calls
   * @returns the condition return value
   */
  async keepReadingUntil<T>(prompt: string, condition: (answer: string) => T): Promise<T> {
    try {
      const answer = await this.readline(prompt);
      return condition(answer);
    } catch(err) {
      if (err instanceof Error) {
        return this.keepReadingUntil(err.message, condition);
      } 
      throw err;
    }
  }

  /**
   * Reads a value from the console until a condition is valid
   * @param prompt The message to ask a question
   * @param errorPrompt The message in case of errror
   * @returns The readed integer value
   */
  async keepReadingUntilNaturalNumber(prompt: string, errorPrompt: string): Promise<number> {
    return this.keepReadingUntil(prompt, (answer) => {
      const number = parseInt(answer);
      if (number !== Number(answer) || number < 1) {
        throw new Error(errorPrompt);
      }
      return number;
    });
  }
}