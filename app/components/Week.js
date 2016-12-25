import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import {weekdayHeader} from '../fragments/WeekdayHeader';

const getDecorator = (dayInfo) => {
  let decorator = {
    dayStyle : dayInfo.hasData
    ? {fontWeight: 'bold', fontSize: 'larger', }
    : {fontWeight: 'normal', }
    ,
    dataIcon : dayInfo.hasData
    ? <span className='glyphicon glyphicon-list-alt'></span>
    : ''
    ,
    borderStyle: dayInfo.isCurrentMonth
    ? 'solid'
    : 'dotted'
    ,
    borderWidth: dayInfo.isCurrentMonth
    ? 5
    : 1
    ,
  }
  if (dayInfo.isToday) {
    decorator.dayStyle.color = '#EC7063';
    decorator.dayStyle.border = '2px solid red';
  }

  return decorator;
}

// NOTE: I couldn't use the index parameter because what's being mapped is a *filtered* array, not the complete original
// so, to get around it I had to add the index to the object so that I have the original array's index even after going through a filter
const renderDateCell = (dayInfo) => {
  let {dayStyle, dataIcon, borderStyle, borderWidth} = getDecorator(dayInfo);
  let cellStyle =
    {width: 100, textAlign: 'center', borderStyle: borderStyle, borderWidth: borderWidth, paddingLeft: 25, paddingRight: 25, paddingTop: 25, paddingBottom: 25, }

  return (
    <td key={dayInfo.absoluteIndex} style={cellStyle}>
      <Link style={dayStyle} to={{pathname: 'day', state: {dayInfo: dayInfo, }}}>
        {dayInfo.day}
        {dataIcon}
      </Link>
    </td>
  )
}

export default function Week(props) {

  const dayIterator = (dayInfo) => {
    let startCell = 0;
    let endCell = startCell + 7;

    return renderDateCell(dayInfo)
  }

  return (
    <table cellPadding="10" cellSpacing="10" border="5">
      <thead>
        <tr>
          {dateUtils.getWeekdays().map(weekdayHeader)}
        </tr>
      </thead>
      <tbody>
        <tr>
          {props.weekInfo.map(dayIterator)}
        </tr>
      </tbody>
    </table>
  )
}
