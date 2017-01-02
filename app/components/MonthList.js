import React from 'react';
import * as stringUtils from '../util/stringutils';

export default function MonthList(props) {
  let date = props.date;
  let dates = props.dates;
  let currentYearMonth = props.currentYearMonth;
  const byCurrentYearMonth = (date) => {return date.year == currentYearMonth.year && date.month == currentYearMonth.month}
  const listOfEntries = (date) => {return <li key={date.key}><b>{date.day}</b> - {stringUtils.formatLineBreaksForHtml(date.dateInfo)}</li>}
  return (
    <ul>
      {dates
        .filter(byCurrentYearMonth)
        .map(listOfEntries)
      }
    </ul>
  )
}
