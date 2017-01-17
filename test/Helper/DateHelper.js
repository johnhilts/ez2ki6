export const months = {Jan: 0, Feb: 1, Nov: 10, Dec: 11, };

export const dates = [
  {dateInfo: 'a note about this day', year: 2017, month: months.Jan, day: 1, key: '0', },
  {dateInfo: 'a note about that day', year: 2017, month: months.Jan, day: 2, key: '1', }
];

export const currentYearMonth = {year: 2017, month: months.Jan, daysInMonth: 31, };

export const testYearMonths = [
  {year: 2017, month: months.Jan, lastDay: 31, lastCalendarCellIndex: 35, },
  {year: 2016, month: months.Dec, lastDay: 31, lastCalendarCellIndex: 31, },
  {year: 2016, month: months.Nov, lastDay: 30, lastCalendarCellIndex: 33, },
];
