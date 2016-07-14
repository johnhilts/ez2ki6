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

  buildMonthGrid() {
    let year = moment().year();
    let month = moment().month();
    let theMonth = moment(new Date(year, month, 1));
    let daysInMonth = theMonth.daysInMonth();
    let monthGrid = [];
    let nextCellIndex = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      let date = new moment(new Date(year, month, day));
      for (let cellIndex = nextCellIndex; cellIndex <= 6; cellIndex++) {
        if (date.weekday() == cellIndex) {
          let monthInfo = {year: date.year(), month: date.month(), day: date.date(), isEmpty: false, };
          monthGrid.push(monthInfo);
          nextCellIndex = cellIndex < 6 ? cellIndex + 1 : 0;
          break;
        }
        else {
          let emptyInfo = {isEmpty: true, };
          monthGrid.push(emptyInfo);
        }
      }
    }
    return monthGrid;
  },

  render() {
    let previousMonthLink = <Link to={{pathname: 'calendar', query:{ym: 201606, }, }}>&lt;&lt;</Link>
    let nextMonthLink = <Link to={{pathname: 'calendar', query:{ym: 201608, }, }}>&gt;&gt;</Link>
    return (
      <div>
        <h2>{previousMonthLink} {moment().format('MMMM')} {nextMonthLink}</h2>
        <Calendar monthGrid={this.buildMonthGrid()} />
      </div>
    )
  }
});

export default CalendarContainer;
