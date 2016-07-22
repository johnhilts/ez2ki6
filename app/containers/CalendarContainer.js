import React from 'react';
import Rebase from 're-base';
import { Link } from 'react-router'
import moment from 'moment';
import * as dateUtils from '../util/dateutils';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);
import Calendar from '../components/Calendar';
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

		this.ref = base.syncState(db.getUserRoot(this.props.user.owner) + '/dates', {
			context : this,
			state : 'dates',
			asArray: true,
      queries: {orderByChild: 'day',},
			then(d) {
				this.setState({isLoading: false,});
			},
		});
	},

	componentWillUnmount() {
		base.removeBinding(this.ref);
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
          monthInfo.hasData = this.dateHasData(monthInfo);
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

  dateHasData(date) {
    return this.state.dates.some(dbDate => {return dbDate.year == date.year && dbDate.month == date.month && dbDate.day == date.day;});
  },

  updateByFormattedMonth(formattedMonth) {
    this.setState(this.getCurrentYearMonthFromParamsOrDefault(formattedMonth));
  },

  setViewType(viewType) {
    this.setState({viewType: viewType,});
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
        <div className="row" style={{verticalAlign: 'middle', }}>
          <div className="col-sm-3" style={{verticalAlign: 'middle', }}>
            <h2>{previousMonthLink} {dateUtils.getMonthName(this.state.currentYearMonth.month())} {nextMonthLink}</h2>
          </div>
          <div className="col-sm-2" style={{verticalAlign: 'middle', }}>
            <h2>&gt;&gt; <Link to={{pathname: 'day', state: {monthInfo: today, }}}>Today</Link> &lt;&lt;</h2>
          </div>
          <div className="col-sm-2" style={{paddingTop: 15, paddingBottom: 15, verticalAlign: 'middle', }}>
            <h4>
              <a onClick={this.setViewType.bind(null, this.ViewTypes.Calendar)}>Calendar</a> | <a onClick={this.setViewType.bind(null, this.ViewTypes.List)}>List</a>
            </h4>
          </div>
        </div>
        {
          this.state.isLoading
          ? <IsLoading />
          : this.state.viewType == this.ViewTypes.Calendar
          ? <Calendar monthGrid={this.buildMonthGrid()} />
          : <ul>
              {this.state.dates
              .filter(date => {return date.year == this.state.currentYearMonth.year() && date.month == this.state.currentYearMonth.month()})
              .map(date => {return <li key={date.key}><b>{date.day}</b> - {date.dateInfo}</li>})
              }
            </ul>
        }
      </div>
    )
  }
});

export default CalendarContainer;
