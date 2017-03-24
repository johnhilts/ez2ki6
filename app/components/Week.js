import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import Day from '../components/Day';
import WeekdayHeader from '../components/WeekdayHeader';
import CalendarNavigation from '../components/CalendarNavigation';
import * as enums from '../core/enums';
import * as calendarGrid from '../core/calendarGrid';

export default function Week(props) {

  let weekIndex = props.weekIndex;
  let monthGrid = props.monthGrid;
  const getWeekInfo = (weekIndex) => {return {weekInfo: calendarGrid.getWeekByIndex(monthGrid, weekIndex), weekIndex: weekIndex, monthGrid: monthGrid, };}
  let previousMonthLink = // <a>prev</a> //
    <Link to={{pathname: 'week', state: getWeekInfo(weekIndex - 1)}}>&lt;&lt;</Link>
  let nextMonthLink = <a>&gt;&gt;</a>

  return (
    <div>
      <div className="row" style={{verticalAlign: 'middle', }}>
          <CalendarNavigation previousLink={previousMonthLink} nextLink={nextMonthLink} title={`Week # ${weekIndex}`} />
      </div>
      <div className="row" style={{verticalAlign: 'middle', }}>
        <table cellPadding="10" cellSpacing="10">
          <thead>
            <tr>
              {dateUtils.getWeekdays().map(WeekdayHeader)}
            </tr>
          </thead>
          <tbody>
            <Day weekInfo={props.weekInfo} detailLevel={enums.detailLevel.week} />
          </tbody>
        </table>
      </div>
    </div>
  )

}
