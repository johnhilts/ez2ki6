import moment from 'moment';

export const getCurrentFormattedYearMonth = () => {
  return moment().format('YYYYMM');
}

const getReformattedYearMonth = (formattedYearMonth) => {
  return formattedYearMonth.substring(0, 4) + '-' + formattedYearMonth.substring(4);
}

export const getFormattedYearMonthByQueryYearMonth = (queryYearMonth, offset) => {
  let reformattedYearMonth = getReformattedYearMonth(queryYearMonth);
  return moment(reformattedYearMonth).add({months: offset}).format('YYYYMM');
}

export const getYearMonthByFormattedYearMonth = (formattedYearMonth) => {
  let reformattedYearMonth = getReformattedYearMonth(formattedYearMonth);
  return moment(reformattedYearMonth);
}
