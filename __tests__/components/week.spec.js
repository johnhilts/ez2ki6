import React, { Component } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Week from '../../app/components/Week';

const getWeekInfo = () => {
  return [{year: 2016, month: 11, day: 15, absoluteIndex: 0, isToday: false, isCurrentMonth: true, hasData: false, }];
  // monthInfo.dateEntries = this.state.dates.filter(dbDate => {return dbDate.year == date.year && dbDate.month == date.month && dbDate.day == date.day;});
}

describe('Week component snapshot test', () => {
  it('Should compare the Week component with a snapshot', () => {
    let weekInfo = getWeekInfo();
    const component = ReactTestRenderer.create(
      <Week weekInfo={weekInfo} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
