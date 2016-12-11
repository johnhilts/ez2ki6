import React from 'react';
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

  render() {
    return (
      <CalendarEntry
        calendars={this.props.calendars}
        currentCalendarId={this.props.currentCalendarId}
        onChangeCalendar={this.props.onChangeCalendar}
        onAddCalendar={this.props.onAddCalendar}
        canShowCalendarNameOnly={this.state.canShowCalendarNameOnly}
        onShowCalendarNameChange={this.handleShowCalendarNameChange}
      />
    )
  }

});

export default CalendarEntryContainer;
