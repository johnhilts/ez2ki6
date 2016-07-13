import React from 'react';
import { Link } from 'react-router'

const showDate = (date) => {
  return (
    <td key={date} style={{width: 100, textAlign: 'center', borderStyle: 'solid', borderWidth: 5,
      paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }}>
      <Link to={{pathname: 'calendar/' + date, state: {test: 'abc', }}}>{date}</Link>
    </td>
  )
}

export default function Calendar(props) {
  return (
    <table cellPadding="10" cellSpacing="10" border="5">
      <tbody>
        <tr>
          {props.monthDates.filter((date)=>{return date <= 7;}).map(showDate)}
        </tr>
        <tr>
          {props.monthDates.filter((date)=>{return date > 7 && date <= 14;}).map(showDate)}
        </tr>
        <tr>
          {props.monthDates.filter((date)=>{return date > 14 && date <= 21;}).map(showDate)}
        </tr>
        <tr>
          {props.monthDates.filter((date)=>{return date > 21 && date <= 28;}).map(showDate)}
        </tr>
        <tr>
          {props.monthDates.filter((date)=>{return date > 28 && date <= props.monthDates.length;}).map(showDate)}
        </tr>
      </tbody>
    </table>
  )
}
