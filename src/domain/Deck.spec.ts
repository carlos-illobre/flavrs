import { Deck } from './Deck';
describe('Deck', () => {

  it('should generate a deck with 52 distinct cards', () => {
    const it = new Deck(1).getIterator(0);
    const hashes = [];
    while (it.hasNext()) {
      const hash = it.next().hashCode;
      expect(hashes).not.toContain(hash);
      hashes.push(hash);
    }
    expect(hashes).toHaveLength(52);
  });

  it('should generate two decks with 54 distinct cards', () => {
    const deckCount = 2;
    const it = new Deck(deckCount).getIterator(0);
    const hashes = [];
    while (it.hasNext()) {
      const hash = it.next().hashCode;
      hashes.push(hash);
    }
    expect(hashes).toHaveLength(deckCount*52);
    expect(new Set(hashes).size).toBe(52);
  });
});
