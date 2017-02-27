import React from 'react';
import { Link } from 'react-router'
import * as enums from '../core/enums';
import * as stringUtils from '../util/stringutils';

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

const renderDateEntries = (entry, entryIndex) => {
  let hasMultipleEntries = entryIndex > 0;
  let hr = hasMultipleEntries
    ? <hr style={{background: '#000', border: 0, height: '1px', }}/>
    : ''
  return (
    <div key={entry.key}>
      {hr}
      {stringUtils.formatLineBreaksForHtml(entry.dateInfo)}
    </div>
  )
}

const getInfoBasedOnDetailLevel = (detailLevel, dateEntries) => {
  switch (detailLevel) {
    case enums.detailLevel.month:
    case enums.detailLevel.month_with_data:
      let pathname = detailLevel == enums.detailLevel.month_with_data ? 'week' : 'day';
      return {dayInfoContent: '', pathname: pathname, showDataIcon: true, verticalAlign: 'middle', }
    case enums.detailLevel.week:
      return {dayInfoContent: dateEntries ? <span><br />{dateEntries.map(renderDateEntries)}</span> : '', pathname: 'day', verticalAlign: 'top', }
  }
}

const getCellStyle = (borderStyle, borderWidth, verticalAlign) => {
  return {
    verticalAlign: verticalAlign,
    borderStyle: borderStyle,
    borderWidth: borderWidth,
    width: 100,
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 25,
  }
}

export default function Day(props) {

  let detailLevel = props.detailLevel;

  // NOTE: I couldn't use the index parameter because what's being mapped is a *filtered* array, not the complete original
  // so, to get around it I had to add the index to the object so that I have the original array's index even after going through a filter
  const renderDateCell = (dayInfo, dayIndex, weekInfo) => {
    let {dayStyle, dataIcon, borderStyle, borderWidth} = getDecorator(dayInfo);
    let {dayInfoContent, pathname, showDataIcon, verticalAlign} = getInfoBasedOnDetailLevel(detailLevel, dayInfo.dateEntries);
    let cellStyle = getCellStyle(borderStyle, borderWidth, verticalAlign);
    dataIcon = showDataIcon ? dataIcon : '';
    return (
      <td key={dayInfo.absoluteIndex} style={cellStyle}>
        <Link to={{pathname: pathname, state: {dayInfo: dayInfo, weekInfo: weekInfo, weekIndex: props.weekIndex, }}}>
          <div style={dayStyle}>
            {dayInfo.day}
            {dataIcon}
            {dayInfoContent}
          </div>
        </Link>
      </td>
    )
  }

  return (
    <tr>
      {props.weekInfo.map(renderDateCell)}
    </tr>
  )
}
