import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import CurrentMonthLink from '../../app/components/CurrentMonthLink';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as testHelper from '../../test/Helper/DateHelper';

describe('CurrentMonthLink component snapshot test', () => {

  it('Should compare the CurrentMonthLink component with a snapshot', () => {
    let dayInfo = {year: 2017, month: 4, };
    const component = ReactTestRenderer.create(
      <CurrentMonthLink dayInfo={calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth)} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
