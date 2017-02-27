import React, { Component } from 'react';
import Week from '../components/Week';

class WeekContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {weekInfo: props.location.state.weekInfo, weekIndex: props.location.state.weekIndex, };
  }

  render () {
    return <Week weekInfo={this.state.weekInfo} weekIndex={this.state.weekIndex} />
  }
}

export default WeekContainer;
