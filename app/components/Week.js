import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import Day from '../components/Day';
import WeekdayHeader from '../components/WeekdayHeader';
import CalendarNavigation from '../components/CalendarNavigation';
import * as enums from '../core/enums';
import * as calendarGrid from '../core/calendarGrid';

const weekSettings = {previous: {offset: -1, linkText: '<<', }, next: {offset: 1, linkText: '>>', }, }

const getWeekLink = (weekIndex, monthGrid, weekSetting) => {
  const getWeekInfo = (weekIndex) => {return {weekInfo: calendarGrid.getWeekByIndex(monthGrid, weekIndex), weekIndex: weekIndex, monthGrid: monthGrid, };}
  let weekInfo = getWeekInfo(weekIndex + weekSetting.offset);
  let weekLink = weekInfo.weekInfo.some(x => x.isCurrentMonth) // only navigate weeks in the current month
    ? <Link to={{pathname: 'week', state: weekInfo}}>{weekSetting.linkText}</Link>
    : weekSetting.linkText
  return weekLink;
}

const getWeekLinks = (weekIndex, monthGrid) => {
  let previousWeekLink = getWeekLink(weekIndex, monthGrid, weekSettings.previous);
  let nextWeekLink = getWeekLink(weekIndex, monthGrid, weekSettings.next);

  return {previousWeekLink: previousWeekLink, nextWeekLink: nextWeekLink, };
}

export default function Week(props) {

  let weekIndex = props.weekIndex;
  const {previousWeekLink, nextWeekLink} = getWeekLinks(props.weekIndex, props.monthGrid);

  return (
    <div>
      <div className="row" style={{verticalAlign: 'middle', }}>
          <CalendarNavigation previousLink={previousWeekLink} nextLink={nextWeekLink} title={`Week # ${weekIndex}`} />
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
