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
  /*
  let calendarKeys = [];
  try {
  let calendarKeyIteration = calendars.keys();
  let calendarKeyResult = calendarKeyIteration.next();
  while (!calendarKeyResult.done){
    calendarKeys.push(calendarKeyResult.value);
    calendarKeyResult = calendarKeyIteration.next();
  }
  }
  catch(e) {
    alert(e.toString());
  }
  */
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
