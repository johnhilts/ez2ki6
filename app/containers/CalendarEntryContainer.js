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
    let newCalendarId = this.props.calendars.length;
    this.setState({canShowCalendarNameOnly: true, });
		this.props.onSaveCalendarInfo(calendar);
		this.props.onSaveCurrentCalendarId(newCalendarId);
    base.update(db.getUserRoot(this.props.user.owner), {
      data: {currentCalendarId: newCalendarId, calendars: this.props.calendars, },
    });
  },

  handleChangeCalendar(event) {
    event.preventDefault();
    let currentCalendarId = Number(event.target.value);
    this.setState({canShowCalendarNameOnly: true, });
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
        canShowCalendarNameOnly={this.state.canShowCalendarNameOnly}
        onShowCalendarNameChange={this.handleShowCalendarNameChange}
        onAddCalendar={this.handleAddCalendar}
        onChangeCalendar={this.handleChangeCalendar}
      />
    )
  }

});

export default CalendarEntryContainer;
