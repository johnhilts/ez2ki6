import React from 'react';
import { Link } from 'react-router'

const showDate = (monthInfo, cellIndex) => {
  console.log("cell: " + cellIndex);
  console.log("day: " + monthInfo.day);
  return (
    monthInfo.isEmpty
    ?
    <td key={cellIndex} style={{width: 100, borderStyle: 'dotted', borderWidth: 1,
      paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }}>
      &nbsp;
    </td>
    :
    <td key={cellIndex} style={{width: 100, textAlign: 'center', borderStyle: 'solid', borderWidth: 5,
      paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }}>
      <Link to={{pathname: 'calendar/' + monthInfo.day, state: {test: 'abc', }}}>{monthInfo.day}</Link>
    </td>
  )
}

export default function Calendar(props) {
  return (
    <table cellPadding="10" cellSpacing="10" border="5">
      <tbody>
        {[1, 2, 3, 4, 5, 6].map(weekIndex => {
          let startCell = (weekIndex - 1) * 7;
          let endCell = startCell + 7;
          return (
            <tr>
              {props.monthGrid.filter((monthInfo, cellIndex)=>{return cellIndex > startCell && cellIndex <= endCell;}).map(showDate)}
            </tr>
          )
        }
        )}
      </tbody>
    </table>
  )
}
