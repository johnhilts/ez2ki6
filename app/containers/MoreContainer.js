import React from 'react';
import * as dateUtils from '../util/dateutils';
import * as themeUtils from '../util/themeutils';
import * as searchUtils from '../util/searchutils';
import More from '../components/More';

const MoreContainer = React.createClass({

  getInitialState() {
    let currentCalendarId = this.props.user.currentCalendarId;
    let years = this.getYears(this.props.user.calendars[currentCalendarId].dates);
    let selectedThemeId = this.props.user.selectedThemeId ? this.props.user.selectedThemeId : themeUtils.defaultThemeId;

    return (
      {
        isLoading: true,
        searchResults: [],
        fromDate: dateUtils.getCurrentDate(),
        toDate: dateUtils.getCurrentDate(),
        years: years,
        selectedThemeId: selectedThemeId,
      }
    )
  },

  getYears(dates) {
    if (!dates) {
      return [dateUtils.getCurrentDate().year];
    }

    const uniqueYears = (date, index, array) => array.findIndex(element => element.year === date.year) === index
    let years = dates.filter(uniqueYears).map(date => date.year);
    let currentYear = dateUtils.getCurrentDate().year;
    if (years.findIndex(year => year === currentYear) < 0) {
      years.push(currentYear);
    }
    return years;
  },

  searchFields : {searhText: 0, fromDateMonth: 1, fromDateDay: 2, fromDateYear: 3, toDateMonth: 4, toDateDay: 5, toDateYear: 6, },

  handleSearch(event) {
		event.preventDefault();

    let searchText = event.target[this.searchFields.searhText].value;
    const searchByDateRange = searchUtils.searchByDateRange.bind(null, searchText, this.state.fromDate, this.state.toDate);

    this.setState({
        searchResults: this.props.user.calendars[this.props.user.currentCalendarId].dates.filter(searchByDateRange)
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
    let inputThemeId = event.target.value;
    let selectedThemeId = isNaN(inputThemeId)
      ? this.defaultThemeId
      : parseInt(event.target.value);
    this.setState({selectedThemeId: selectedThemeId, });
    this.props.onSaveThemeId(selectedThemeId);
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
        selectedThemeId={this.state.selectedThemeId}
        onSaveCalendarInfo={this.props.onSaveCalendarInfo}
        onSaveCurrentCalendarId={this.props.onSaveCurrentCalendarId}
        user={this.props.user}
      />
    )
  }
});

export default MoreContainer;
