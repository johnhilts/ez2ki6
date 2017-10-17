import React from 'react';
import 'babel-polyfill';

const showAddNewCalendar = () => {
  document.getElementById('divAddNewCalendar').style.display='block';
  document.getElementById('newCalendarName').focus();
}

export default function CalendarEntry(props) {
  let calendars = props.calendars;
  if (!calendars) {
    return <span>&nbsp;</span>
  }
  if (props.canShowCalendarNameOnly) {
    return <div onClick={props.onShowCalendarNameChange}>[{calendars[props.currentCalendarId].name}]...</div>
  }
  let calendarKeys = Array.from(calendars.keys());
  const calendarEntries = (calendarKey) => { return <option key={calendarKey} value={calendarKey}>{calendars[calendarKey].name}</option> }
  return (
    <div>
      Calendars<br />
      <select value={props.currentCalendarId} onChange={props.onChangeCalendar} className='invertedText'>
        {calendarKeys.map(calendarEntries)}
      </select>
      &nbsp;
      <button onClick={showAddNewCalendar}><span className="glyphicon glyphicon-plus invertedText" aria-hidden="true"></span></button>
      <div id='divAddNewCalendar' style={{display: 'none', }}>
        Add a New Calendar<br />
        <input placeholder="Calendar Name" id="newCalendarName" onBlur={props.onAddCalendar} className='invertedText' />
      </div>
    </div>
  )
}
