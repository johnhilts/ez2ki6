import React from 'react';
import * as stringUtils from '../util/stringutils';

export default function MonthList(props) {
  let date = props.date;
  let dates = props.dates;
  let currentYearMonth = props.currentYearMonth;
  return (
    <ul>
      {dates
        .filter(date => {return date.year == currentYearMonth.year() && date.month == currentYearMonth.month()})
        .map(date => {return <li key={date.key}><b>{date.day}</b> - {stringUtils.formatLineBreaksForHtml(date.dateInfo)}</li>})
      }
    </ul>
  )
}
