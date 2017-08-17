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

const alsoEnteredOnThisDate = (dateInfo, showDelete, onChange, onMouseOver, index) => {
  const deleteButton = () => {
    return (
      <button type="button" className="btn btn-danger" style={{position: 'absolute', top: 0, right: 0}}>
        <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
      </button>
    )
  }
  return (
    <div key={dateInfo.key} className="list-group-item linkBackground" onMouseOver={onMouseOver.bind(null, dateInfo.key)}>
      <a id={'a' + dateInfo.key} onClick={handleDateInfoEditStart.bind(null, dateInfo.key)}>{stringUtils.formatLineBreaksForHtml(dateInfo.dateInfo)}</a>
      <textArea id={'txt' + dateInfo.key} onChange={onChange.bind(null, dateInfo.key)} onBlur={handleDateInfoEditComplete.bind(null, dateInfo.key)}
        style={{display: 'none', width: '100%', }} value={dateInfo.dateInfo} className="linkLabel" />
      {showDelete ? deleteButton() : ""}
    </div>
  )
}

export default function Calendar(props) {
  let dayInfo = props.dayInfo;
  const datesWithEntries = (dateInfo) => {return alsoEnteredOnThisDate(dateInfo, props.showDeletes[dateInfo.key], props.onChange, props.onMouseOver);}
  return (
    props.isLoading
    ?
      <IsLoading />
    :
      <div>
        <CurrentMonthLink dayInfo={props.dayInfo} />
        <form onSubmit={props.onSubmit}>
          <div>Write down something related to {dayInfo.month+1}/{dayInfo.day}/{dayInfo.year}</div>
          <textArea style={{width: 300, height: 150, }} className="linkLabel" /><br />
          <input type="hidden" value={dayInfo.year} />
          <input type="hidden" value={dayInfo.month} />
          <input type="hidden" value={dayInfo.day} />
          <button type="submit" className="btn btn-info">Save</button>
        </form>
        <div>&nbsp;</div>
        <ul>
          {props.dates.map(datesWithEntries)}
        </ul>
      </div>
  )
}
