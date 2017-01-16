import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Day from '../../app/components/Day';
import * as enums from '../../app/core/enums';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as dateUtils from '../../app/util/dateutils';

describe('Day component snapshot test', () => {

  let months = {Jan: 0, Feb: 1, Nov: 10, Dec: 11, };

  let dates = [
    {dateInfo: 'a note about this day', year: 2017, month: months.Jan, day: 1, key: '0', },
    {dateInfo: 'a note about that day', year: 2017, month: months.Jan, day: 2, key: '1', }
  ]
  let currentYearMonth = {year: 2017, month: months.Jan, daysInMonth: 31, };

  it('Should compare the Day component with a snapshot', () => {

    const currentWeek = (monthInfo, cellIndex) => {
      return cellIndex >= 0 && cellIndex < 7;
    }

    let monthGrid = calendarGrid.buildMonthGrid(dates, currentYearMonth);
    let weekInfo = monthGrid.filter(currentWeek);
    const component = ReactTestRenderer.create(
      <Day key={0} weekInfo={weekInfo} detailLevel={enums.detailLevel.month} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
