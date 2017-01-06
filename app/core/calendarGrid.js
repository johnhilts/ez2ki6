import * as dateUtils from '../util/dateutils';

const saturday = 6;

export const getDayInfo = (dates, currentDate, isCurrentMonth, absoluteCellIndex) => {

  const matchesDate = dbDate => {return dbDate.year == currentDate.year && dbDate.month == currentDate.month && dbDate.day == currentDate.day;};

  let isToday = dateUtils.isToday(currentDate.year, currentDate.month, currentDate.day);
  let {year, month, day} = currentDate;
  let dayInfo = {year, month, day, absoluteIndex: absoluteCellIndex, isToday: isToday, isCurrentMonth: isCurrentMonth, };
  dayInfo.hasData = dates.some(matchesDate);
  if (dayInfo.hasData) {
    dayInfo.dateEntries = dates.filter(matchesDate);
  }

  return dayInfo;
}

export const getLastCalendarCellIndexFromStartOfCurrentMonth = (year, month, lastDay) => {
  let lastCurrentMonthWeekday = dateUtils.getWeekdayFromYearMonthDay(year, month, lastDay);
  return (
    lastCurrentMonthWeekday == saturday
    ? lastDay
    : lastDay + (saturday - lastCurrentMonthWeekday)
  )
}

export const buildMonthGrid = (dates, currentYearMonth) => {

  const getDayCellInfo = (currentDate, isCurrentMonth) => {
    return getDayInfo(dates, currentDate, isCurrentMonth, absoluteCellIndex++);
  }

  const daysInMonth = currentYearMonth.daysInMonth;
  let monthGrid = [];
  let absoluteCellIndex = 0;
  const currentYear = currentYearMonth.year;
  const currentMonth = currentYearMonth.month;
  const lastCalendarCellIndex = getLastCalendarCellIndexFromStartOfCurrentMonth(currentYear, currentMonth, daysInMonth);

  const processCalendarCell = (cellIndex) => {
    let day = cellIndex + 1;
    let date = dateUtils.getDateFromYearMonthDay(currentYear, currentMonth, day);

    const partOfWeekInPreviousMonth = (cellIndex) => {
      let previousMonthDate = dateUtils.addDays(currentYear, currentMonth, day, (weekday - cellIndex) * -1);
      return getDayCellInfo(previousMonthDate, false);
    }

    const weekInCurrentMonth = (cellIndex) => {
      return getDayCellInfo(date, true);
    }

    const partOfWeekInNextMonth = (cellIndex) => {
      return getDayCellInfo(date, false);
    }

    const daysInSameWeekPreviousMonth = (weekCellIndex) => {
      return day == 1 && weekday > weekCellIndex && weekCellIndex < saturday;
    }

    const daysInCurrentMonth = (weekCellIndex) => {
      return weekday == weekCellIndex && day <= daysInMonth;
    }

    const daysInSameWeekNextMonth = (weekCellIndex) => {
      return weekday == weekCellIndex && day > daysInMonth;
    }

    const weekLength = 7;
    let calendarCellsForWeek = [...Array(weekLength).keys()];
    let weekday = dateUtils.getWeekdayFromYearMonthDay(currentYear, currentMonth, day);

    monthGrid.push(...calendarCellsForWeek.filter(daysInSameWeekPreviousMonth).map(partOfWeekInPreviousMonth));
    monthGrid.push(...calendarCellsForWeek.filter(daysInCurrentMonth).map(weekInCurrentMonth));
    monthGrid.push(...calendarCellsForWeek.filter(daysInSameWeekNextMonth).map(partOfWeekInNextMonth));
  }

  let calendarCellsFromStartOfCurrentMonth = [...Array(lastCalendarCellIndex).keys()];
  calendarCellsFromStartOfCurrentMonth.map(processCalendarCell);

  return monthGrid;
}
