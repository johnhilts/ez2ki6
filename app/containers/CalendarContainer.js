import React from 'react';
import { Link } from 'react-router'
import moment from 'moment';
import Calendar from '../components/Calendar';
import * as dateUtils from '../util/dateutils';

const CalendarContainer = React.createClass({
  getInitialState() {
    return(this.getCurrentYearMonthFromParamsOrDefault());
  },

  componentWillReceiveProps(nextProps) {
    return this.setState(this.getCurrentYearMonthFromParamsOrDefault());
  },

  getCurrentYearMonthFromParamsOrDefault() {
    let currentFormattedMonth = this.props.location.query['ym'];
    if (!currentFormattedMonth) {
      currentFormattedMonth = dateUtils.getCurrentFormattedYearMonth();
    }
    let currentYearMonth = dateUtils.getYearMonthByFormattedYearMonth(currentFormattedMonth);

    return (
      {
        currentFormattedMonth: currentFormattedMonth,
        currentYearMonth: currentYearMonth,
      }
    )
  },

  buildMonthGrid() {
    const currentYearMonth = this.state.currentYearMonth;
    const daysInMonth = currentYearMonth.daysInMonth();
    let monthGrid = [];
    let nextCellIndex = 0;
    let absoluteCellIndex = 0;
    const year = currentYearMonth.year();
    const month = currentYearMonth.month();
    for (let day = 1; day <= daysInMonth; day++) {
      let date = new moment(new Date(year, month, day));
      for (let cellIndex = nextCellIndex; cellIndex <= 6; cellIndex++) {
        if (date.weekday() == cellIndex) {
          let monthInfo = {year: date.year(), month: date.month(), day: date.date(), isEmpty: false, absoluteIndex: absoluteCellIndex, };
          monthGrid.push(monthInfo);
          nextCellIndex = cellIndex < 6 ? cellIndex + 1 : 0;
          absoluteCellIndex++;
          break;
        }
        else {
          let emptyInfo = {isEmpty: true, absoluteIndex: absoluteCellIndex, };
          absoluteCellIndex++;
          monthGrid.push(emptyInfo);
        }
      }
    }
    return monthGrid;
  },

  render() {
    let previousFormattedMonth = dateUtils.getFormattedYearMonthByQueryYearMonth(this.state.currentFormattedMonth, -1);
    let nextFormattedMonth = dateUtils.getFormattedYearMonthByQueryYearMonth(this.state.currentFormattedMonth, 1);
    let previousMonthLink = <Link to={{pathname: 'calendar', query:{ym: previousFormattedMonth, }, }}>&lt;&lt;</Link>
    let nextMonthLink = <Link to={{pathname: 'calendar', query:{ym: nextFormattedMonth, }, }}>&gt;&gt;</Link>
    return (
      <div>
        <h2>{previousMonthLink} {this.state.currentYearMonth.format('MMMM')} {nextMonthLink}</h2>
        <Calendar monthGrid={this.buildMonthGrid()} />
      </div>
    )
  }
});

export default CalendarContainer;
