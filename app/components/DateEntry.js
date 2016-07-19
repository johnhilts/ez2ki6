import React from 'react';
import * as dateUtils from '../util/dateutils';
import { Link } from 'react-router'

const alsoEnteredOnThisDate = (dateInfo) => {
  return (
    <li key={dateInfo.key}>{dateInfo.dateInfo}</li>
  )
}

export default function Calendar(props) {
  let monthInfo = props.monthInfo;
  let monthName = dateUtils.getMonthName(monthInfo.month);
  return (
    props.isLoading
    ?
      <div style={{background: 'red',}}>L O A D I N G ...</div>
    :
      <div>
        <div style={{marginBottom: 15, fontSize: 'small', }}>
          <Link to={{pathname: 'calendar', query: {ym: dateUtils.getFormattedYearMonthByYearMonth(monthInfo.year, monthInfo.month) , },}}>Return to {monthName}</Link>
        </div>
        <form onSubmit={props.onSubmit}>
          <div>Write down something related to {monthInfo.month+1}/{monthInfo.day}/{monthInfo.year}</div>
          <textArea style={{width: 300, height: 150, }}/><br />
          <input type="hidden" value={monthInfo.year} />
          <input type="hidden" value={monthInfo.month} />
          <input type="hidden" value={monthInfo.day} />
          <button type="submit" className="btn btn-info">Save</button>
        </form>
        <ul>
          {props.dates.map(alsoEnteredOnThisDate)}
        </ul>
      </div>
  )
}
