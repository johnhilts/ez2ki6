import React from 'react';

const DateContainer = React.createClass({
  getInitialState() {
    return (
      {
        date: this.props.params.date,
      }
    )
  },
  
  render() {
    return (
      <div>Enter info here for {this.state.date}!</div>
    )
  }
});

export default DateContainer;
