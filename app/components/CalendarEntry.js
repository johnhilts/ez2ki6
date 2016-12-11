import React from 'react';

const showAddNewCalendar = () => {
  document.getElementById('divAddNewCalendar').style='block';
  document.getElementById('newCalendarName').focus();
}

export default function CalendarEntry(props) {
  let calendars = props.calendars;
  let calendarKeys = Array.from(calendars.keys());
  if (props.canShowCalendarNameOnly) {
    return <div onClick={props.onShowCalendarNameChange}>[{calendars[props.currentCalendarId].name}]...</div>
  }
  return (
    <div>
      Calendars<br />
      <select value={props.currentCalendarId} onChange={props.onChangeCalendar}>
        {calendarKeys.map(calendarKey => {return <option key={calendarKey} value={calendarKey}>{calendars[calendarKey].name}</option>})}
      </select>
      &nbsp;
      <button onClick={showAddNewCalendar}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
      <div id='divAddNewCalendar' style={{display: 'none', }}>
        Add a New Calendar<br />
        <input placeholder="Calendar Name" id="newCalendarName" onBlur={props.onAddCalendar} />
      </div>
    </div>
  )
}
