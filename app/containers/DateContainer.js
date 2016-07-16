import React from 'react';

const DateContainer = React.createClass({
  getInitialState() {
    return (
      {
        monthInfo: this.props.location.state.monthInfo,
      }
    )
  },

  render() {
    return (
      <div>
        <form>
          <div>Write down something related to {this.state.monthInfo.month+1}/{this.state.monthInfo.day}/{this.state.monthInfo.year}</div>
          <textArea /><br />
          <button type="submit" className="btn btn-info">Save</button>
        </form>
      </div>
    )
  }
});

export default DateContainer;
