import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';

export default function CurrentMonthLink(props) {
  let dayInfo = props.dayInfo;
  let monthName = dateUtils.getMonthName(dayInfo.month);
  return (
    <div style={{marginBottom: 15, fontSize: 'small', }}>
      <Link to={{pathname: 'calendar', query: {ym: dateUtils.getFormattedYearMonthByYearMonth(dayInfo.year, dayInfo.month) , },}}><h4>&gt;&gt;Return to {monthName}&lt;&lt;</h4></Link>
    </div>
  )
}
