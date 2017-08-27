import React from 'react';
import * as db from '../core/database';
import * as userRepository from '../domain/UserRepository';
import DateEntry from '../components/DateEntry';

const DateContainer = React.createClass({
  getInitialState() {
    return (
      {
        dayInfo: this.props.location.state.dayInfo,
        dates: [],
        isLoading: true,
      }
    )
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

    let endpoint = db.getUserRoot(this.props.user.owner) + '/calendars/' + this.props.user.currentCalendarId + '/dates';
		this.databaseReference = userRepository.sync(endpoint, this, 'dates', true, {orderByChild: 'day',}, () => {this.setState({isLoading: false,})});
	},

	componentWillUnmount() {
		userRepository.removeBinding(this.databaseReference);
	},

	dateFields : {dateInfo: 0, year: 1, month: 2, day: 3, },

  handleAddInfo(event) {
		event.preventDefault();

		var timestamp = (new Date()).getTime();
		var date = {key: 'date-' + timestamp, dateInfo: event.target[this.dateFields.dateInfo].value,
      year: Number(event.target[this.dateFields.year].value), month: Number(event.target[this.dateFields.month].value),
      day: Number(event.target[this.dateFields.day].value)};

		this.state.dates.push(date);

		this.setState({ dates : this.state.dates });
		this.props.onSaveDateInfo(this.state.dates);

		event.target.reset();
  },

	handleUpdateDateInfo(key, event) {
    let index = this.state.dates.findIndex(x=>{return x.key == key});
    let dateInfo = this.state.dates[index];
    dateInfo.dateInfo = event.target.value;
    this.state.dates[index].dateInfo = dateInfo.dateInfo;
		this.setState({ dates : this.state.dates });
		this.props.onSaveDateInfo(this.state.dates);
	},

  render() {
    const byCurrentDate = (dateInfo) => {return dateInfo.year == dayInfo.year && dateInfo.month == dayInfo.month && dateInfo.day == dayInfo.day;}
    var dayInfo = this.state.dayInfo;
    var filteredDates = this.state.dates.filter(byCurrentDate);
    return (
      <DateEntry
        dayInfo={dayInfo}
        isLoading={this.state.isLoading}
        onSubmit={this.handleAddInfo}
        onChange={this.handleUpdateDateInfo}
        onMouseOver={this.handleMouseOverDateInfo}
        dates={filteredDates}
      />
    )
  }
});

export default DateContainer;
