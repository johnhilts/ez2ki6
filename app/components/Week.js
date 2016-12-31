import React from 'react';
import * as dateUtils from '../util/dateutils';
import Day from '../components/Day';
import WeekdayHeader from '../components/WeekdayHeader';
import * as enums from '../core/enums';

export default function Week(props) {

  return (
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
  )

}
