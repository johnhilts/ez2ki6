import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import More from '../../app/components/More';
import * as dateUtils from '../../app/util/dateutils';

describe('More component snapshot test', () => {

  it('Should compare the More component with a snapshot', () => {
    // TODO - consider making MoreContainer.searchFields publicly accessible
    const searchFields = {searhText: 0, fromDateMonth: 1, fromDateDay: 2, fromDateYear: 3, toDateMonth: 4, toDateDay: 5, toDateYear: 6, };
    const testDate = {year: 2017, month: 4, day: 31, }
    const component = ReactTestRenderer.create(
      <More
        searchResults={[]}
        fromDate={testDate}
        toDate={testDate}
        searchFields={searchFields}
        onDateChange={()=>{}}
        years={[2017]}
        user={{themeId: 0}}
      />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
