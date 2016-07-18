import React from 'react';
import Rebase from 're-base';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);
import DateEntry from '../components/DateEntry';

const DateContainer = React.createClass({
  getInitialState() {
    return (
      {
        monthInfo: this.props.location.state.monthInfo,
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

		this.ref = base.syncState(db.getUserRoot(this.props.user.owner) + '/dates', {
			context : this,
			state : 'dates',
			asArray: true,
			then(d) {
				this.setState({isLoading: false,});
			},
		});
	},

	componentWillUnmount() {
		base.removeBinding(this.ref);
	},

	dateFields : {dateInfo: 0, year: 1, month: 2, day: 3, },

  handleAddInfo(event) {
		event.preventDefault();

		var timestamp = (new Date()).getTime();
		var date = {key: 'date-' + timestamp, dateInfo: event.target[this.dateFields.dateInfo].value,
      year: event.target[this.dateFields.year].value, month: event.target[this.dateFields.month].value,
      day: event.target[this.dateFields.day].value};

		this.state.dates.push(date);

		this.setState({ dates : this.state.dates });
		this.props.onSaveDateInfo(this.state.dates);

		event.target.reset();
  },

  render() {
    var monthInfo = this.state.monthInfo;
    var filteredDates =
      this.state.dates.filter(dateInfo => {return dateInfo.year == monthInfo.year && dateInfo.month == monthInfo.month && dateInfo.day == monthInfo.day;});
    return (
      <DateEntry monthInfo={monthInfo} isLoading={this.state.isLoading} onSubmit={this.handleAddInfo} dates={filteredDates} />
    )
  }
});

export default DateContainer;
