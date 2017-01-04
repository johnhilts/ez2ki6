import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import * as db from '../core/database';
import * as userRepository from '../domain/UserRepository';
import * as calendarGrid from '../core/calendarGrid';
import Calendar from '../components/Calendar';
import MonthList from '../components/MonthList';
import IsLoading from '../components/IsLoading';

const CalendarContainer = React.createClass({
  ViewTypes: {Calendar: 0, List: 1, },
  getInitialState() {
    let currentYearMonthInfo = this.getCurrentYearMonthFromParamsOrDefault(this.props.location.query['ym']);
    return(
      {
        currentFormattedMonth: currentYearMonthInfo.currentFormattedMonth,
        currentYearMonth: currentYearMonthInfo.currentYearMonth,
        dates: [],
        viewType: this.ViewTypes.Calendar,
        isLoading: true,
      }
    );
  },

  isAuthenticated(user) {
    return (user && user.owner && user.owner != 0);
  },

  goToLogin() {
    this.context.router.push({ pathname: '/', })
  },

	// NOTE: componentDidMount is used to initialize a component with server-side info
	// fore more info, see react docs: https://facebook.github.io/react/docs/component-specs.html
  componentDidMount() {
    if (!this.isAuthenticated(this.props.user)) {
      this.goToLogin();
    }

		this.databaseReference = userRepository.sync(db.getUserRoot(this.props.user.owner) + '/calendars/' + this.props.user.currentCalendarId + '/dates',
      this, 'dates', true, {orderByChild: 'day',}, () => {this.setState({isLoading: false,})});
	},

	componentWillUnmount() {
		userRepository.removeBinding(this.databaseReference);
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
    const getDayInfo = (currentDate, isCurrentMonth) => {
      return calendarGrid.getDayInfo(this.state.dates, currentDate, isCurrentMonth, absoluteCellIndex++);
    }

    const currentYearMonth = this.state.currentYearMonth;
    const daysInMonth = currentYearMonth.daysInMonth;
    let monthGrid = [];
    let absoluteCellIndex = 0;
    const currentYear = currentYearMonth.year;
    const currentMonth = currentYearMonth.month;
    const lastCalendarCellIndex = calendarGrid.getLastCalendarCellIndexFromStartOfCurrentMonth(currentYear, currentMonth, daysInMonth);
    const saturday = 6;

    const processCalendarCell = (cellIndex) => {
      let day = cellIndex + 1;
      let date = dateUtils.getDateFromYearMonthDay(currentYear, currentMonth, day);

      const partOfWeekInPreviousMonth = (cellIndex) => {
        let previousMonthDate = dateUtils.addDays(currentYear, currentMonth, day, (weekday - cellIndex) * -1);
        return getDayInfo(previousMonthDate, false);
      }

      const weekInCurrentMonth = (cellIndex) => {
        return getDayInfo(date, true);
      }

      const partOfWeekInNextMonth = (cellIndex) => {
        return getDayInfo(date, false);
      }

      const daysInSameWeekPreviousMonth = (weekCellIndex) => {
        return day == 1 && weekday > weekCellIndex && weekCellIndex < saturday;
      }

      const daysInCurrentMonth = (weekCellIndex) => {
        return weekday == weekCellIndex && day <= daysInMonth;
      }

      const daysInSameWeekNextMonth = (weekCellIndex) => {
        return weekday == weekCellIndex && day > daysInMonth;
      }

      const weekLength = 7;
      let calendarCellsForWeek = [...Array(weekLength).keys()];
      let weekday = dateUtils.getWeekdayFromYearMonthDay(currentYear, currentMonth, day);

      monthGrid.push(...calendarCellsForWeek.filter(daysInSameWeekPreviousMonth).map(partOfWeekInPreviousMonth));
      monthGrid.push(...calendarCellsForWeek.filter(daysInCurrentMonth).map(weekInCurrentMonth));
      monthGrid.push(...calendarCellsForWeek.filter(daysInSameWeekNextMonth).map(partOfWeekInNextMonth));
    }

    let calendarCellsFromStartOfCurrentMonth = [...Array(lastCalendarCellIndex).keys()];
    calendarCellsFromStartOfCurrentMonth.map(processCalendarCell);

    return monthGrid;
  },

  updateByFormattedMonth(formattedMonth) {
    this.setState(this.getCurrentYearMonthFromParamsOrDefault(formattedMonth));
  },

  setViewType(viewType) {
    this.setState({viewType: viewType,});
  },

  renderCalendarHeader() {
    let previousFormattedMonth = dateUtils.getFormattedYearMonthByYearMonthAndOffset(this.state.currentFormattedMonth, dateUtils.monthOffset.previous);
    let nextFormattedMonth = dateUtils.getFormattedYearMonthByYearMonthAndOffset(this.state.currentFormattedMonth, dateUtils.monthOffset.next);
    let previousMonthLink = <a onClick={this.updateByFormattedMonth.bind(null, previousFormattedMonth)}>&lt;&lt;</a>
    let nextMonthLink = <a onClick={this.updateByFormattedMonth.bind(null, nextFormattedMonth)}>&gt;&gt;</a>
    let currentDate = dateUtils.getCurrentDate();
    let today = {year: currentDate.year, month: currentDate.month, day: currentDate.day, };
    return (
        <div className="row" style={{verticalAlign: 'middle', }}>
          <div className="col-sm-4 col-lg-3" style={{verticalAlign: 'middle', }}>
            <h2>{previousMonthLink} {dateUtils.getMonthName(this.state.currentYearMonth.month)} {nextMonthLink}</h2>
          </div>
          <div className="col-sm-3 col-lg-2" style={{verticalAlign: 'middle', }}>
            <h2>&gt;&gt; <Link to={{pathname: 'day', state: {dayInfo: today, }}}>Today</Link> &lt;&lt;</h2>
          </div>
          <div className="col-sm-3" style={{paddingTop: 15, paddingBottom: 15, verticalAlign: 'middle', }}>
            <h4>
              <a onClick={this.setViewType.bind(null, this.ViewTypes.Calendar)}>Calendar</a> | <a onClick={this.setViewType.bind(null, this.ViewTypes.List)}>List</a>
            </h4>
          </div>
        </div>
    )
  },

  render() {
    return (
      <div>
        {this.renderCalendarHeader()}
        {
          this.state.isLoading
          ? <IsLoading />
          : this.state.viewType == this.ViewTypes.Calendar
          ? <Calendar monthGrid={this.buildMonthGrid()} />
          : <MonthList dates={this.state.dates} date={this.state.date} currentYearMonth={this.state.currentYearMonth} />
        }
      </div>
    )
  }
});

export default CalendarContainer;
