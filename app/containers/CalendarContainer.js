import React from 'react';
import { Link } from 'react-router'
import moment from 'moment';
import Calendar from '../components/Calendar';
import * as dateUtils from '../util/dateutils';

const CalendarContainer = React.createClass({
  getInitialState() {
    return(this.getCurrentYearMonthFromParamsOrDefault(this.props.location.query['ym']));
  },

  getCurrentYearMonthFromParamsOrDefault(currentFormattedMonth) {
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

  updateByFormattedMonth(formattedMonth) {
    this.setState(this.getCurrentYearMonthFromParamsOrDefault(formattedMonth));
  },

  render() {
    let previousFormattedMonth = dateUtils.getFormattedYearMonthByQueryYearMonth(this.state.currentFormattedMonth, -1);
    let nextFormattedMonth = dateUtils.getFormattedYearMonthByQueryYearMonth(this.state.currentFormattedMonth, 1);
    let previousMonthLink = <a onClick={this.updateByFormattedMonth.bind(null, previousFormattedMonth)}>&lt;&lt;</a>
    let nextMonthLink = <a onClick={this.updateByFormattedMonth.bind(null, nextFormattedMonth)}>&gt;&gt;</a>
    let currentDate = dateUtils.getCurrentDate();
    let today = {year: currentDate.year(), month: currentDate.month(), day: currentDate.date(), };
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <h2>{previousMonthLink} {dateUtils.getMonthName(this.state.currentYearMonth.month())} {nextMonthLink}</h2>
          </div>
          <div className="col-sm-2">
            <h2>&gt;&gt; <Link to={{pathname: 'day', state: {monthInfo: today, }}}>Today</Link> &lt;&lt;</h2>
          </div>
        </div>
        <Calendar monthGrid={this.buildMonthGrid()} />
      </div>
    )
  }
});

export default CalendarContainer;
