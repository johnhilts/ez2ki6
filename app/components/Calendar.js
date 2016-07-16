import React from 'react';
import { Link } from 'react-router'

// NOTE: I couldn't use the index parameter because what's being mapped is a *filtered* array, not the complete original
// so, to get around it I had to add the index to the object so that I have the original array's index even after going through a filter
const showDate = (monthInfo) => {
  return (
    monthInfo.isEmpty
    ?
    <td key={monthInfo.absoluteIndex} style={{width: 100, borderStyle: 'dotted', borderWidth: 1,
      paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }}>
      &nbsp;
    </td>
    :
    <td key={monthInfo.absoluteIndex} style={{width: 100, textAlign: 'center', borderStyle: 'solid', borderWidth: 5,
      paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }}>
      <Link to={{pathname: 'calendar/' + monthInfo.day + '/edit', state: {monthInfo: monthInfo, }}}>{monthInfo.day}</Link>
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
            <tr key={weekIndex}>
              {props.monthGrid.filter((monthInfo, cellIndex)=>{return cellIndex >= startCell && cellIndex < endCell;}).map(showDate)}
            </tr>
          )
        }
        )}
      </tbody>
    </table>
  )
}
