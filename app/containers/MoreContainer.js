import React from 'react';
import Rebase from 're-base';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);
import More from '../components/More';

const MoreContainer = React.createClass({

  getInitialState() {
    return (
      {
        searchResults: [],
      }
    )
  },

	searchFields : {searhText: 0, fromDate: 1, toDate: 2, },

  handleSearch(event) {
		event.preventDefault();

    let searchText = event.target[this.searchFields.searhText].value;

    this.setState(
      {searchResults: this.props.user.dates.filter(date => {return date.dateInfo.toLowerCase().indexOf(searchText.toLowerCase()) >= 0})}
    )

  },

  render() {
    return <More onSearch={this.handleSearch} searchResults={this.state.searchResults} />
  }
});

export default MoreContainer;
