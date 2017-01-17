import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Day from '../../app/components/Day';
import * as enums from '../../app/core/enums';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as dateUtils from '../../app/util/dateutils';
import * as testHelper from '../../test/Helper/DateHelper';

describe('Day component snapshot test', () => {

  it('Should compare the Day component with a snapshot', () => {

    const currentWeek = (monthInfo, cellIndex) => {
      return cellIndex >= 0 && cellIndex < 7;
    }

    let monthGrid = calendarGrid.buildMonthGrid(testHelper.dates, testHelper.currentYearMonth);
    let weekInfo = monthGrid.filter(currentWeek);
    const component = ReactTestRenderer.create(
      <Day key={0} weekInfo={weekInfo} detailLevel={enums.detailLevel.month} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
