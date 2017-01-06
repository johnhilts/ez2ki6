import {expect} from 'chai';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as dateUtils from '../../app/util/dateutils';

describe('calendar grid', () => {

  let months = {Jan: 0, Feb: 1, Nov: 10, Dec: 11, };

  let dates = [
    {dateInfo: 'a note about this day', year: 2017, month: months.Jan, day: 1, key: '0', },
    {dateInfo: 'a note about that day', year: 2017, month: months.Jan, day: 2, key: '1', }
  ]
  let currentYearMonth = {year: 2017, month: months.Jan, daysInMonth: 31, };

  it('returns day info for a given date', () => {
    let expectedDateIndex = 1;
    let current = {year: 2017, month: months.Jan, day: 2};
    let currentDate = dateUtils.getDateFromYearMonthDay(current.year, current.month, current.day);
    let isCurrentMonth = true;
    let absoluteCellIndex = 0;
    let expectedDayInfo = {year: current.year, month: current.month, day: current.day, absoluteIndex: absoluteCellIndex,
      isToday: dateUtils.isToday(currentDate.year, currentDate.month, currentDate.day), isCurrentMonth: isCurrentMonth,
      hasData: true, dateEntries: [dates[expectedDateIndex]], };
    expect(calendarGrid.getDayInfo(dates, currentDate, isCurrentMonth, absoluteCellIndex)).to.eql(expectedDayInfo);
  });

  let testYearMonths = [
    {year: 2017, month: months.Jan, lastDay: 31, lastCalendarCellIndex: 35, },
    {year: 2016, month: months.Dec, lastDay: 31, lastCalendarCellIndex: 31, },
    {year: 2016, month: months.Nov, lastDay: 30, lastCalendarCellIndex: 33, },
  ];
  testYearMonths.forEach(function(testYearMonth) {
    it('gets the Last Calendar Cell Index', () => {
      let {year, month, lastDay, } = testYearMonth;
      let actual = calendarGrid.getLastCalendarCellIndexFromStartOfCurrentMonth(year, month, lastDay);
      expect(actual, `testing with ${testYearMonth.year}/${testYearMonth.month}`).to.eql(testYearMonth.lastCalendarCellIndex);
    });
  });

  it('builds a full month grid for a given year/month', () => {
    let monthGrid = calendarGrid.buildMonthGrid(dates, currentYearMonth);
    console.log(calendarGrid.buildMonthGrid(dates, currentYearMonth));
    expect(monthGrid.length).to.eql(35);
  });

  it('has the expected date in the first cell', () => {
    let monthGrid = calendarGrid.buildMonthGrid(dates, currentYearMonth);
    let expectedFirstDate = dateUtils.getDateFromYearMonthDay(2017, months.Jan, 1);
    let actualFirstDate = dateUtils.getDateFromYearMonthDay(monthGrid[0].year, monthGrid[0].month, monthGrid[0].day);
    expect(actualFirstDate).to.eql(expectedFirstDate);
  });

  it('has the expected date in the last cell', () => {
    let monthGrid = calendarGrid.buildMonthGrid(dates, currentYearMonth);
    let expectedLastDate = dateUtils.getDateFromYearMonthDay(2017, months.Feb, 4);
    let actualLastDate = dateUtils.getDateFromYearMonthDay(monthGrid[34].year, monthGrid[34].month, monthGrid[34].day);
    expect(actualLastDate).to.eql(expectedLastDate);
  });

})
