import * as dateUtils from '../util/dateutils';

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
