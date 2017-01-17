import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Calendar from '../../app/components/Calendar';
import * as enums from '../../app/core/enums';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as dateUtils from '../../app/util/dateutils';
import * as testHelper from '../../test/Helper/DateHelper';

describe('Calendar component snapshot test', () => {

  it('Should compare the Calendar component with a snapshot', () => {
    const component = ReactTestRenderer.create(
      <Calendar monthGrid={calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth)} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
