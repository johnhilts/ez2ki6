import React from 'react';
import moment from 'moment';
import Calendar from '../components/Calendar';

const CalendarContainer = React.createClass({
  getInitialState() {
    return(
      {calendar: {},}
    )
  },

  buildMonthDates() {
    let year = moment().year();
    let month = moment().month();
    let theMonth = moment(new Date(year, month, 1));
    let daysInMonth = theMonth.daysInMonth();
    let monthDates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      monthDates.push(i);
    }
    return monthDates;

  },

  render() {
    return (
      <div>
        <Calendar monthDates={this.buildMonthDates()} />
      </div>
    )
  }
});

export default CalendarContainer;
