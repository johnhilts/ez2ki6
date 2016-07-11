import React from 'react';

const showDate = (date) => {
  let lineBreak = date % 7 == 0 ? <br /> : null;
  return (
    <a name={date} key={date} style={{width: 350, }}>
      <span style={{textAlign: 'center', width:350, marginLeft: 20, marginRight: 20, }}>{date}</span>
      {lineBreak}
    </a>
  )
}

export default function Calendar(props) {
  return (
    <div>
      {props.monthDates.map(showDate)}
    </div>
  )
}
