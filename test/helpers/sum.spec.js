// sample test to demo testing setup. Remove this.
import { expect } from 'chai';

import sum from '../../src/helpers/sum';

describe('Sum', () => {
  it('adds two integers', () => {
    expect(sum(2, 5)).to.equal(7);
  });
});
