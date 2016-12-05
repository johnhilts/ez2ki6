import moment from 'moment';

export const getCurrentFormattedYearMonth = () => {
  return moment().format('YYYYMM');
}

// Input: YYYYMM
// Output: YYYY-MM
const getReformattedYearMonth = (formattedYearMonth) => {
  return formattedYearMonth.substring(0, 4) + '-' + formattedYearMonth.substring(4);
}

// Input: YYYYMM, -1|1
// Output: YYYY-MM
export const getFormattedYearMonthByQueryYearMonth = (queryYearMonth, offset) => {
  let reformattedYearMonth = getReformattedYearMonth(queryYearMonth);
  return moment(reformattedYearMonth).add({months: offset}).format('YYYYMM');
}

// Input: YYYYMM
// Output: moment object
export const getYearMonthByFormattedYearMonth = (formattedYearMonth) => {
  let reformattedYearMonth = getReformattedYearMonth(formattedYearMonth);
  return moment(reformattedYearMonth);
}

// Input: y, m
// Output: YYYYMM
export const getFormattedYearMonthByYearMonth = (year, month) => {
  return moment(new Date(year, month, 1)).format('YYYYMM');
}

// Input: m
// Output: MMMM
export const getMonthName = (month) => {
  return moment(new Date(moment().year(), month, 1)).format('MMMM');
}

// returns date object based on default moment object
export const getCurrentDate = () => {
  return {year: moment().year(), month: moment().month(), day: moment().date(), };
}

// Input: y,m,d
// Output: true or false if y,m,d is for the actual current date
export const isToday = (year, month, day) => {
  let date = moment(new Date(year, month, day));
  let today = moment(new Date());
  return today.isSame(date, 'day');
}

// Input: y,m,d
// Output: date object
export const getDateFromYearMonthDay = (year, month, day) => {
  let date = moment(new Date(year, month, day));
  return {year: date.year(), month: date.month(), day: date.date(), };
}

// Input: y,m,d
// Output: integer to represent weekday (0 to 6, Sunday to Saturday)
export const getWeekdayFromYearMonthDay = (year, month, day) => {
  return moment(new Date(year, month, day)).weekday();
}

// Input: y,m,d
// Output: MM/DD/YYYY
export const getFormattedMonthDayYear = (year, month, day) => {
  return moment(new Date(year, month, day)).format('MM/DD/YYYY');
}

export const getDaysByYearMonth = (year, month) => {
  return moment(new Date(year, month, 1)).daysInMonth();
}
