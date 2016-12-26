import React from 'react';
import * as dateUtils from '../util/dateutils';
import Day from '../components/Day';
import {weekdayHeader} from '../fragments/WeekdayHeader';
import * as enums from '../core/enums';

export default function Week(props) {

  return (
    <table cellPadding="10" cellSpacing="10" border="5">
      <thead>
        <tr>
          {dateUtils.getWeekdays().map(weekdayHeader)}
        </tr>
      </thead>
      <tbody>
        <Day weekInfo={props.weekInfo} detailLevel={enums.detailLevel.week} />
      </tbody>
    </table>
  )

}
