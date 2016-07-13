import React from 'react';
import { Link } from 'react-router'
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
    let previousMonthLink = <Link to={{pathname: 'calendar', query:{ym: 201606, }, }}>&lt;&lt;</Link>
    let nextMonthLink = <Link to="calendar">&gt;&gt;</Link>
    return (
      <div>
        <h2>{previousMonthLink} {moment().format('MMMM')} {nextMonthLink}</h2>
        <Calendar monthDates={this.buildMonthDates()} />
      </div>
    )
  }
});

export default CalendarContainer;
