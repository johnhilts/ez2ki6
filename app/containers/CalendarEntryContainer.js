import React from 'react';
import Rebase from 're-base';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);
import CalendarEntry from '../components/CalendarEntry';

const CalendarEntryContainer = React.createClass({

  getInitialState() {
    return (
      {canShowCalendarNameOnly: true, }
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

  handleShowCalendarNameChange() {
    this.setState({canShowCalendarNameOnly: !this.state.canShowCalendarNameOnly})
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
      <CalendarEntry
        calendars={this.props.calendars}
        currentCalendarId={this.props.currentCalendarId}
        onChangeCalendar={this.props.onChangeCalendar}
        onAddCalendar={this.props.onAddCalendar}
        canShowCalendarNameOnly={this.state.canShowCalendarNameOnly}
        onShowCalendarNameChange={this.handleShowCalendarNameChange}
        onAddCalendar={this.handleAddCalendar}
        onChangeCalendar={this.handleChangeCalendar}
      />
    )
  }

});

export default CalendarEntryContainer;
