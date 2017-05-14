import React from 'react';
import * as stringUtils from '../util/stringutils';
import IsLoading from '../components/IsLoading';
import CurrentMonthLink from '../components/CurrentMonthLink';

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
  let dayInfo = props.dayInfo;
  const datesWithEntries = (dateInfo) => {return alsoEnteredOnThisDate(dateInfo, props.onChange);}
  return (
    props.isLoading
    ?
      <IsLoading />
    :
      <div>
        <CurrentMonthLink dayInfo={props.dayInfo} />
        <form onSubmit={props.onSubmit}>
          <div>Write down something related to {dayInfo.month+1}/{dayInfo.day}/{dayInfo.year}</div>
          <textArea style={{width: 300, height: 150, }}/><br />
          <input type="hidden" value={dayInfo.year} />
          <input type="hidden" value={dayInfo.month} />
          <input type="hidden" value={dayInfo.day} />
          <button type="submit" className="btn btn-info">Save</button>
        </form>
        <ul>
          {props.dates.map(datesWithEntries)}
        </ul>
      </div>
  )
}
