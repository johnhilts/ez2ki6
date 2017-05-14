import React, { Component } from 'react';
import Week from '../components/Week';

class WeekContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {weekInfo: props.location.state.weekInfo, weekIndex: props.location.state.weekIndex, monthGrid: props.location.state.monthGrid,
      dayInfo: props.location.state.dayInfo, };
  }

	componentWillReceiveProps(nextProps) {
    if (nextProps.location && nextProps.location.state && nextProps.location.state.weekIndex !== this.state.weekIndex) {
      let np = nextProps.location.state;
      this.setState({weekInfo: np.weekInfo, weekIndex: np.weekIndex, monthGrid: np.monthGrid, });
    }
	}

  render () {
    return <Week weekInfo={this.state.weekInfo} weekIndex={this.state.weekIndex} monthGrid={this.state.monthGrid} dayInfo={this.state.dayInfo} />
  }
}

export default WeekContainer;
