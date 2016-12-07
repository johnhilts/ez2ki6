import React from 'react';
import { Link } from 'react-router'
import moment from 'moment';

const weekdayHeader = (weekdayName) => {
  return (
    <th key={weekdayName} style={{textAlign: 'center', }}>{weekdayName}</th>
  )
}

const getDecorator = (monthInfo) => {
  let decorator = {
    dayStyle : monthInfo.hasData
    ? {fontWeight: 'bold', fontSize: 'larger', }
    : {fontWeight: 'normal', }
    ,
    dataIcon : monthInfo.hasData
    ? <span className='glyphicon glyphicon-list-alt'></span>
    : ''
    ,
    borderStyle: monthInfo.isCurrentMonth
    ? 'solid'
    : 'dotted'
    ,
    borderWidth: monthInfo.isCurrentMonth
    ? 5
    : 1
    ,
  }
  if (monthInfo.isToday) {
    decorator.dayStyle.color = '#EC7063';
    decorator.dayStyle.border = '2px solid red';
  }

  return decorator;
}

// NOTE: I couldn't use the index parameter because what's being mapped is a *filtered* array, not the complete original
// so, to get around it I had to add the index to the object so that I have the original array's index even after going through a filter
const renderDateCell = (monthInfo) => {
  let {dayStyle, dataIcon, borderStyle, borderWidth} = getDecorator(monthInfo);
  let cellStyle =
    {width: 100, textAlign: 'center', borderStyle: borderStyle, borderWidth: borderWidth, paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }

  return (
    <td key={monthInfo.absoluteIndex} style={cellStyle}>
      <Link style={dayStyle} to={{pathname: 'day', state: {monthInfo: monthInfo, }}}>
        {monthInfo.day}
        {dataIcon}
      </Link>
    </td>
  )
}

export default function Calendar(props) {

  const weekIterator = (weekIndex) => {
    let startCell = (weekIndex - 1) * 7;
    let endCell = startCell + 7;

    const currentWeek = (monthInfo, cellIndex) => {
      return cellIndex >= startCell && cellIndex < endCell;
    }

    return (
      <tr key={weekIndex}>
        {props.monthGrid.filter(currentWeek).map(renderDateCell)}
      </tr>
    )
  }

  return (
    <table cellPadding="10" cellSpacing="10" border="5">
      <thead>
        <tr>
          {moment.weekdays().map(weekdayHeader)}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5, 6].map(weekIterator)}
      </tbody>
    </table>
  )
}
