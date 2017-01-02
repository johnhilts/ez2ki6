import {expect} from 'chai';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as dateUtils from '../../app/util/dateutils';

describe('calendar', () => {
  it('returns day info for a given date', () => {
    let dates = [
      {dateInfo: 'a note about this day', year: 2017, month: 1, day: 1, key: '0', },
      {dateInfo: 'a note about that day', year: 2017, month: 1, day: 2, key: '1', }
    ]
    let expectedDateIndex = 1;
    let current = {year: 2017, month: 1, day: 2};
    let currentDate = dateUtils.getDateFromYearMonthDay(current.year, current.month, current.day);
    let isCurrentMonth = true;
    let absoluteCellIndex = 0;
    let expectedDayInfo = {year: current.year, month: current.month, day: current.day, absoluteIndex: absoluteCellIndex,
      isToday: dateUtils.isToday(currentDate.year, currentDate.month, currentDate.day), isCurrentMonth: isCurrentMonth,
      hasData: true, dateEntries: [dates[expectedDateIndex]], };
    expect(calendarGrid.getDayInfo(dates, currentDate, isCurrentMonth, absoluteCellIndex)).to.eql(expectedDayInfo);
  });
})
