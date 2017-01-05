import {expect} from 'chai';
import * as common from '../../app/util/common';

describe('range', () => {
  it('returns a range of 0..1', () => {
    let expected = [0, 1];
    let actual = common.range(0, 2);
    expect(expected).to.eql(actual);
  });
  it('returns a range of 1..3', () => {
    let expected = [1, 2, 3];
    let actual = common.range(1, 4);
    expect(expected).to.eql(actual);
  });
  it('returns a range of 0..2 with only 1 parameter', () => {
    let expected = [0, 1, 2];
    let actual = common.range(3);
    expect(expected).to.eql(actual);
  });
})
