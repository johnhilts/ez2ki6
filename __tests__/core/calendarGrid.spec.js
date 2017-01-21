import * as calendarGrid from '../../app/core/calendarGrid';
import * as dateUtils from '../../app/util/dateutils';
import * as enums from '../../app/core/enums';
import * as testHelper from '../../test/Helper/DateHelper';

describe('calendar grid', () => {

  it('returns day info for a given date', () => {
    let expectedDateIndex = 1;
    let current = {year: 2017, month: testHelper.months.Jan, day: 2};
    let currentDate = dateUtils.getDateFromYearMonthDay(current.year, current.month, current.day);
    let isCurrentMonth = true;
    let absoluteCellIndex = 0;
    let expectedDayInfo = {year: current.year, month: current.month, day: current.day, absoluteIndex: absoluteCellIndex,
      isToday: dateUtils.isToday(currentDate.year, currentDate.month, currentDate.day), isCurrentMonth: isCurrentMonth,
      hasData: true, dateEntries: [testHelper.dates[expectedDateIndex]], };
    expect(calendarGrid.getDayInfo(testHelper.dates, currentDate, isCurrentMonth, absoluteCellIndex)).toEqual(expectedDayInfo);
  });

  testHelper.testYearMonths.forEach(function(testYearMonth) {
    it('gets the Last Calendar Cell Index', () => {
      let {year, month, lastDay, } = testYearMonth;
      let actual = calendarGrid.getLastCalendarCellIndexFromStartOfCurrentMonth(year, month, lastDay);
      expect(actual, `testing with ${testYearMonth.year}/${testYearMonth.month}`).toBe(testYearMonth.lastCalendarCellIndex);
    });
  });

  it('builds a full month grid for a given year/month', () => {
    let monthGrid = calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth);
    // console.log(calendarGrid.buildMonthGrid(dates, currentYearMonth));
    expect(monthGrid.length).toBe(35);
  });

  it('has the expected date in the first cell', () => {
    let monthGrid = calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth);
    let expectedFirstDate = dateUtils.getDateFromYearMonthDay(2017, testHelper.months.Jan, 1);
    let actualFirstDate = dateUtils.getDateFromYearMonthDay(monthGrid[0].year, monthGrid[0].month, monthGrid[0].day);
    expect(actualFirstDate).toEqual(expectedFirstDate);
  });

  it('has the expected date in the last cell', () => {
    let monthGrid = calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth);
    let expectedLastDate = dateUtils.getDateFromYearMonthDay(2017, testHelper.months.Feb, 4);
    let actualLastDate = dateUtils.getDateFromYearMonthDay(monthGrid[34].year, monthGrid[34].month, monthGrid[34].day);
    expect(actualLastDate).toEqual(expectedLastDate);
  });

  it('links directly to a day if no info yet for that week', ()=>{
    let monthGrid = calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth);
    monthGrid.forEach(m => m.hasData = false);
    expect(calendarGrid.setLinkDetailLevelForMonthView(monthGrid)).toBe(enums.detailLevel.month)
  })

  it('links to a week if that week has info', ()=>{
    let monthGrid = calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth);
    monthGrid.forEach(m => m.hasData = true);
    expect(calendarGrid.setLinkDetailLevelForMonthView(monthGrid)).toBe(enums.detailLevel.month_with_data)
  })

  it('returns week info for a given week index', () => {
    let monthGrid = calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth);
    monthGrid.forEach(m => m.hasData = true);
    let weekIndex = 1;
    let weekInfo = calendarGrid.getWeekByIndex(monthGrid, weekIndex);
    expect(weekInfo.length).toBe(7);
  })

})
