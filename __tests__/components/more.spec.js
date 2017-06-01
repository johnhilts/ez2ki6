import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import More from '../../app/components/More';
/*
import * as enums from '../../app/core/enums';
import * as calendarGrid from '../../app/core/calendarGrid';
import * as testHelper from '../../test/Helper/DateHelper';
*/
import * as dateUtils from '../../app/util/dateutils';

describe('More component snapshot test', () => {

  it('Should compare the More component with a snapshot', () => {
    // TODO - consider making MoreContainer.searchFields publicly accessible
    const searchFields = {searhText: 0, fromDateMonth: 1, fromDateDay: 2, fromDateYear: 3, toDateMonth: 4, toDateDay: 5, toDateYear: 6, };
    const component = ReactTestRenderer.create(
      <More
        searchResults={[]}
        fromDate={dateUtils.getCurrentDate()}
        toDate={dateUtils.getCurrentDate()}
        searchFields={searchFields}
        onDateChange={()=>{}}
        years={[dateUtils.getCurrentDate().year]}
        user={{themeId: 0}}
      />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
