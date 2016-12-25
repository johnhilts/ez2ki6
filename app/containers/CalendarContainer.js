import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import * as db from '../core/database';
import * as userRepository from '../domain/UserRepository';
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

  getLastCalendarCellIndex(year, month, lastDay) {
      let lastCurrentMonthWeekday = dateUtils.getWeekdayFromYearMonthDay(year, month, lastDay);
      return (
        lastCurrentMonthWeekday == 6
        ? lastDay
        : lastDay + (6 - lastCurrentMonthWeekday)
      )
  },

  buildMonthGrid() {
    const setDateInfo = (date, isCurrentMonth) => {
      let isToday = dateUtils.isToday(date.year, date.month, date.day);
      let monthInfo = {year: date.year, month: date.month, day: date.day, absoluteIndex: absoluteCellIndex, isToday: isToday, isCurrentMonth: isCurrentMonth, };
      monthInfo.hasData = this.dateHasData(monthInfo);
      if (monthInfo.hasData) {
        monthInfo.dateEntries = this.state.dates.filter(dbDate => {return dbDate.year == date.year && dbDate.month == date.month && dbDate.day == date.day;});
      }
      monthGrid.push(monthInfo);
    }

    const getCurrentDateValues = (currentYearMonth) => {
      let currentYear = currentYearMonth.year();
      let currentMonth = currentYearMonth.month();
      let daysInMonth = currentYearMonth.daysInMonth();
      return (
        {
          daysInMonth: daysInMonth,
          monthGrid: [],
          nextCellIndex: 0,
          absoluteCellIndex: 0,
          currentYear: currentYear,
          currentMonth: currentMonth,
          lastCalendarCellIndex: this.getLastCalendarCellIndex(currentYear, currentMonth, daysInMonth),
        }
      )
    }

    let {daysInMonth, monthGrid, nextCellIndex, absoluteCellIndex, currentYear, currentMonth, lastCalendarCellIndex} =
      getCurrentDateValues(this.state.currentYearMonth);

    for (let day = 1; day <= lastCalendarCellIndex; day++) {
      let date = dateUtils.getDateFromYearMonthDay(currentYear, currentMonth, day);
      for (let cellIndex = nextCellIndex; cellIndex <= 6; cellIndex++) {
        let weekday = dateUtils.getWeekdayFromYearMonthDay(currentYear, currentMonth, day);
        if (weekday == cellIndex && day <= daysInMonth) {
          setDateInfo(date, true);
          nextCellIndex = cellIndex < 6 ? cellIndex + 1 : 0;
          absoluteCellIndex++;
          break;
        }
        else {
          if (day == 1) {
            let previousMonthDate = dateUtils.addDays(currentYear, currentMonth, day, (weekday - cellIndex) * -1);
            setDateInfo(previousMonthDate, false);
          }
          else if (day > daysInMonth) {
            setDateInfo(date, false);
          }
          absoluteCellIndex++;
          if (day > daysInMonth) {
            break;
          }
        }
      }
    }
    return monthGrid;
  },

  dateHasData(date) {
    return this.state.dates.some(dbDate => {return dbDate.year == date.year && dbDate.month == date.month && dbDate.day == date.day;});
  },

  updateByFormattedMonth(formattedMonth) {
    this.setState(this.getCurrentYearMonthFromParamsOrDefault(formattedMonth));
  },

  setViewType(viewType) {
    this.setState({viewType: viewType,});
  },

  renderCalendarHeader() {
    let previousFormattedMonth = dateUtils.getFormattedYearMonthByQueryYearMonth(this.state.currentFormattedMonth, -1);
    let nextFormattedMonth = dateUtils.getFormattedYearMonthByQueryYearMonth(this.state.currentFormattedMonth, 1);
    let previousMonthLink = <a onClick={this.updateByFormattedMonth.bind(null, previousFormattedMonth)}>&lt;&lt;</a>
    let nextMonthLink = <a onClick={this.updateByFormattedMonth.bind(null, nextFormattedMonth)}>&gt;&gt;</a>
    let currentDate = dateUtils.getCurrentDate();
    let today = {year: currentDate.year, month: currentDate.month, day: currentDate.day, };
    return (
        <div className="row" style={{verticalAlign: 'middle', }}>
          <div className="col-sm-4 col-lg-3" style={{verticalAlign: 'middle', }}>
            <h2>{previousMonthLink} {dateUtils.getMonthName(this.state.currentYearMonth.month())} {nextMonthLink}</h2>
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
