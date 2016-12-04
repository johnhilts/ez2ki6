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
  }
  if (monthInfo.isToday) {
    decorator.dayStyle.color = '#EC7063';
    decorator.dayStyle.border = '2px solid red';
  }

  return decorator;
}

const renderEmptyCell = (monthInfo) => {
  return (
    <td key={monthInfo.absoluteIndex} style={{width: 100, borderStyle: 'dotted', borderWidth: 1,
      paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }}>
      &nbsp;
    </td>
  )
}

const renderDateCell = (monthInfo) => {
  let {dayStyle, dataIcon} = getDecorator(monthInfo);

  return (
    <td key={monthInfo.absoluteIndex} style={{width: 100, textAlign: 'center', borderStyle: 'solid', borderWidth: 5,
      paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }}>
      <Link style={dayStyle} to={{pathname: 'day', state: {monthInfo: monthInfo, }}}>
        {monthInfo.day}
        {dataIcon}
      </Link>
    </td>
  )
}

// NOTE: I couldn't use the index parameter because what's being mapped is a *filtered* array, not the complete original
// so, to get around it I had to add the index to the object so that I have the original array's index even after going through a filter
const showDate = (monthInfo) => {
  return monthInfo.isEmpty ? renderEmptyCell(monthInfo) : renderDateCell(monthInfo);
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
        {props.monthGrid.filter(currentWeek).map(showDate)}
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
