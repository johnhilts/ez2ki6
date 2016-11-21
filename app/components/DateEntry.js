import React from 'react';
import * as dateUtils from '../util/dateutils';
import * as stringUtils from '../util/stringutils';
import { Link } from 'react-router'
import IsLoading from '../components/IsLoading';

const handleDateInfoEditStart = (key) => {
  document.querySelector('[id="txt' + key + '"]').style.display = 'block';
  document.querySelector('[id="a' + key + '"]').style.display = 'none';
}

const handleDateInfoEditComplete = (key) => {
  document.querySelector('[id="txt' + key + '"]').style.display = 'none';
  document.querySelector('[id="a' + key + '"]').style.display = 'block';
}

const alsoEnteredOnThisDate = (dateInfo, onChange) => {
  return (
    <div key={dateInfo.key} className="list-group-item">
      <a id={'a' + dateInfo.key} className="list-group-item" onClick={handleDateInfoEditStart.bind(null, dateInfo.key)}>{stringUtils.formatLineBreaksForHtml(dateInfo.dateInfo)}</a>
      <textArea id={'txt' + dateInfo.key} onChange={onChange.bind(null, dateInfo.key)} onBlur={handleDateInfoEditComplete.bind(null, dateInfo.key)}
        style={{display: 'none', width: '100%', }} value={dateInfo.dateInfo} />
    </div>
  )
}

export default function Calendar(props) {
  let monthInfo = props.monthInfo;
  let monthName = dateUtils.getMonthName(monthInfo.month);
  return (
    props.isLoading
    ?
      <IsLoading />
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
          {props.dates.map(dateInfo => {
            return alsoEnteredOnThisDate(dateInfo, props.onChange);
            })}
        </ul>
      </div>
  )
}
