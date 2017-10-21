import {expect} from 'chai';
import * as testHelper from '../../test/Helper/DateHelper';
import * as searchUtils from '../../app/util/searchutils';

describe('searchUtils', () => {
  it('searches for text within a date range', () => {
    let searchText = "favorite restaurant";
    let fromDate = {year: 2015, month: 9, day: 15};
    let toDate = {year: 2017, month: 9, day: 15};
    let dates = testHelper.datesForSearchTests;

    const searchByDateRange = searchUtils.searchByDateRange.bind(null, searchText, fromDate, toDate);
    let actual = dates.filter(searchByDateRange);
    let expected = dates[1];

    expect(actual[0]).to.eql(expected);
  });
})
