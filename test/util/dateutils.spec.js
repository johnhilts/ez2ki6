import {expect} from 'chai';
import * as dateUtils from '../../app/util/dateutils';

const getFormattedYearMonthByYearMonthAndOffset = (currentYearMonth, formattedYearMonth, offset) => {
    expect(dateUtils.getFormattedYearMonthByYearMonthAndOffset(currentYearMonth, offset)).to.eql(formattedYearMonth);
}

describe('dateUtils', () => {
  it('gets a formatted year/month for next month', () => {
    expect(getFormattedYearMonthByYearMonthAndOffset('201611', '201612', dateUtils.monthOffset.next));
  });
  it('gets a formatted year/month for previous month', () => {
    expect(getFormattedYearMonthByYearMonthAndOffset('201611', '201610', dateUtils.monthOffset.previous));
  });
  it('gets a formatted year/month for this month', () => {
    expect(getFormattedYearMonthByYearMonthAndOffset('201611', '201611', dateUtils.monthOffset.current));
  });
  it('parses Formatted Year Month', () => {
    let formattedYearMonth = '201701';
    let expected = {year: 2017, month: 0, daysInMonth: 31, };
    let actual = dateUtils.getYearMonthByFormattedYearMonth(formattedYearMonth);
    expect(actual).to.eql(expected);
  });
})
