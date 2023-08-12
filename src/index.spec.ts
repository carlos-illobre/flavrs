import { test } from './index';

describe('first test suite',  () => {
  it('first test', () => {
    expect(test(1)).toBe(2);
  });
});