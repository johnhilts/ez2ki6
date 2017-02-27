import React from 'react';
import * as dateUtils from '../util/dateutils';
import Day from '../components/Day';
import WeekdayHeader from '../components/WeekdayHeader';
import CalendarNavigation from '../components/CalendarNavigation';
import * as enums from '../core/enums';

export default function Week(props) {

  let previousMonthLink = <a>&lt;&lt;</a>
  let nextMonthLink = <a>&gt;&gt;</a>
  let weekIndex = props.weekIndex;

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
