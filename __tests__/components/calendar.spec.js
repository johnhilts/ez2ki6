import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Calendar from '../../app/components/Calendar';
import * as enums from '../../app/core/enums';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as dateUtils from '../../app/util/dateutils';

describe('Calendar component snapshot test', () => {

  let months = {Jan: 0, Feb: 1, Nov: 10, Dec: 11, };

  let dates = [
    {dateInfo: 'a note about this day', year: 2017, month: months.Jan, day: 1, key: '0', },
    {dateInfo: 'a note about that day', year: 2017, month: months.Jan, day: 2, key: '1', }
  ]
  let currentYearMonth = {year: 2017, month: months.Jan, daysInMonth: 31, };

  it('Should compare the Calendar component with a snapshot', () => {
    const component = ReactTestRenderer.create(
      <Calendar monthGrid={calendarGrid.buildMonthGrid(dates, currentYearMonth)} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
