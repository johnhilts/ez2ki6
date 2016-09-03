import React from 'react';
import Rebase from 're-base';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);
import * as dateUtils from '../util/dateutils';
import More from '../components/More';

const MoreContainer = React.createClass({

  getInitialState() {
    return (
      {
        isLoading: true,
        searchResults: [],
        fromDate: dateUtils.getCurrentDate(),
        toDate: dateUtils.getCurrentDate(),
        years: this.getYears(this.props.user.dates),
        currentCalendarId: this.props.user.currentCalendarId,
      }
    )
  },

  getYears(dates) {
    if (!dates) {
      return [dateUtils.getCurrentDate().year];
    }

    let years = [];
    dates.map((date) => { if (years.indexOf(date.year) < 0) years.push(date.year); } );
    return years;
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

		this.ref = base.syncState(db.getUserRoot(this.props.user.owner) + '/calendars/', {
			context : this,
			state : 'calendars',
			asArray: true,
			then(d) {
				this.setState({isLoading: false,});
			},
		});
	},

	componentWillUnmount() {
		base.removeBinding(this.ref);
	},

  searchFields : {searhText: 0, fromDateMonth: 1, fromDateDay: 2, fromDateYear: 3, toDateMonth: 4, toDateDay: 5, toDateYear: 6, },

  handleSearch(event) {
		event.preventDefault();

    let searchText = event.target[this.searchFields.searhText].value;
    let fromDate = new Date(this.state.fromDate.year, this.state.fromDate.month, this.state.fromDate.day);
    let toDate = new Date(this.state.toDate.year, this.state.toDate.month, this.state.toDate.day);

    this.setState({
        searchResults: this.props.user.dates.filter(date => {
          let compareDate = new Date(date.year, date.month, date.day);
          return (
            date.dateInfo.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
            && fromDate <= compareDate
            && toDate >= compareDate
          );
        })
      }
    )
  },

  handleDateChange(searchField, event) {
    switch (searchField) {
      case this.searchFields.fromDateYear:
        this.setState({ fromDate: dateUtils.getDateFromYearMonthDay(event.target.value, this.state.fromDate.month, this.state.fromDate.day), });
        break;
      case this.searchFields.fromDateMonth:
        this.setState({ fromDate: dateUtils.getDateFromYearMonthDay(this.state.fromDate.year, event.target.value, this.state.fromDate.day), });
        break;
      case this.searchFields.fromDateDay:
        this.setState({ fromDate: dateUtils.getDateFromYearMonthDay(this.state.fromDate.year, this.state.fromDate.month, event.target.value), });
        break;
      case this.searchFields.toDateYear:
        this.setState({ toDate: dateUtils.getDateFromYearMonthDay(event.target.value, this.state.toDate.month, this.state.toDate.day), });
        break;
      case this.searchFields.toDateMonth:
        this.setState({ toDate: dateUtils.getDateFromYearMonthDay(this.state.toDate.year, event.target.value, this.state.toDate.day), });
        break;
      case this.searchFields.toDateDay:
        this.setState({ toDate: dateUtils.getDateFromYearMonthDay(this.state.toDate.year, this.state.toDate.month, event.target.value), });
        break;
    }
  },

  handleAddCalendar(event) {
    event.preventDefault();
    let newCalendarName = document.querySelector("#newCalendarName").value;
    if (!newCalendarName || newCalendarName.length == 0) {
      alert("Please enter a Calendar Name to add a new Calendar");
      return;
    }
    // this won't work well with multiple users logged in as the same person
    let calendar = {name: newCalendarName, };
    let newCalendarId = this.state.calendars.length;
    this.state.calendars.push(calendar);
    this.setState({calendars: this.state.calendars, currentCalendarId: newCalendarId, });
		this.props.onSaveCalendarInfo(calendar);
		this.props.onSaveCurrentCalendarId(newCalendarId);
  },

  handleChangeCalendar(event) {
    event.preventDefault();
    let currentCalendarId = Number(event.target.value);
    this.setState({currentCalendarId: currentCalendarId, });
		this.props.onSaveCurrentCalendarId(currentCalendarId);
    base.update(db.getUserRoot(this.props.user.owner), {
      data: {currentCalendarId: currentCalendarId},
    });
  },

  render() {
    return (
      <More
        onSearch={this.handleSearch}
        onDateChange={this.handleDateChange}
        onAddCalendar={this.handleAddCalendar}
        onChangeCalendar={this.handleChangeCalendar}
        searchResults={this.state.searchResults}
        years={this.state.years}
        fromDate={this.state.fromDate}
        toDate={this.state.toDate}
        searchFields={this.searchFields}
        calendars={this.props.user.calendars}
        currentCalendarId={this.props.user.currentCalendarId}
      />
    )
  }
});

export default MoreContainer;
