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
      <div>
        <form>
          What happened today?<br />
          <textArea /><br />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
});

export default DateContainer;
