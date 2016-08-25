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

// returns default moment object
export const getCurrentDate = () => {
  return {year: moment().year(), month: moment().month(), day: moment().date(), };
}

// Input: y,m,d
// Output: MM/DD/YYYY
export const getFormattedMonthDayYear = (year, month, day) => {
  return moment(new Date(year, month, day)).format('MM/DD/YYYY');
}
