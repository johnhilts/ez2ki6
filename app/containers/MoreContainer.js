import React from 'react';
import * as dateUtils from '../util/dateutils';
import More from '../components/More';

const MoreContainer = React.createClass({

  getInitialState() {
    let currentCalendarId = this.props.user.currentCalendarId;
    let years = this.getYears(this.props.user.calendars[currentCalendarId].dates);

    return (
      {
        isLoading: true,
        searchResults: [],
        fromDate: dateUtils.getCurrentDate(),
        toDate: dateUtils.getCurrentDate(),
        years: years,
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

  searchFields : {searhText: 0, fromDateMonth: 1, fromDateDay: 2, fromDateYear: 3, toDateMonth: 4, toDateDay: 5, toDateYear: 6, },

  handleSearch(event) {
		event.preventDefault();

    let searchText = event.target[this.searchFields.searhText].value;
    let fromDate = new Date(this.state.fromDate.year, this.state.fromDate.month, this.state.fromDate.day);
    let toDate = new Date(this.state.toDate.year, this.state.toDate.month, this.state.toDate.day);

    this.setState({
        searchResults: this.props.user.calendars[this.props.user.currentCalendarId].dates.filter(date => {
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

  handleThemeChange(event) {
    this.setState({selectedTheme: event.target.value, })
  },

  render() {
    return (
      <More
        onSearch={this.handleSearch}
        onDateChange={this.handleDateChange}
        onThemeChange={this.handleThemeChange}
        searchResults={this.state.searchResults}
        years={this.state.years}
        fromDate={this.state.fromDate}
        toDate={this.state.toDate}
        searchFields={this.searchFields}
        calendars={this.props.user.calendars}
        currentCalendarId={this.props.user.currentCalendarId}
        selectedTheme={this.state.selectedTheme}
        onSaveCalendarInfo={this.props.onSaveCalendarInfo}
        onSaveCurrentCalendarId={this.props.onSaveCurrentCalendarId}
        user={this.props.user}
      />
    )
  }
});

export default MoreContainer;
