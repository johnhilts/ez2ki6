import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import * as calendarGrid from '../core/calendarGrid';
import WeekdayHeader from '../components/WeekdayHeader';
import Day from '../components/Day';
import * as enums from '../core/enums';

export default function Calendar(props) {

  const weekIterator = (weekIndex) => {
    let startCell = (weekIndex - 1) * 7;
    let endCell = startCell + 7;

    const currentWeek = (monthInfo, cellIndex) => {
      return cellIndex >= startCell && cellIndex < endCell;
    }

    let weekInfo = props.monthGrid.filter(currentWeek);
    let detailLevel = calendarGrid.setLinkDetailLevelForMonthView(weekInfo);
    return <Day key={weekIndex} weekIndex={weekIndex} weekInfo={weekInfo} detailLevel={detailLevel} monthGrid={props.monthGrid} />
  }

  return (
    <table cellPadding="10" cellSpacing="10">
      <thead>
        <tr>
          {dateUtils.getWeekdays().map(WeekdayHeader)}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5, 6].map(weekIterator)}
      </tbody>
    </table>
  )
}
