import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';

const searchResults = (day) => {
  return (
    <div key={day.key} className="col-sm-12">
      <Link to={{pathname: 'day', state: {monthInfo: day, }}}>{dateUtils.getFormattedMonthDayYear(day.year, day.month, day.day)} : {day.dateInfo}</Link>
    </div>
  )
}

export default function More(props) {
  return (
    <div>
      <form onSubmit={props.onSearch}>
        <div className="row">
          <div className="col-sm-12">
            <input placeholder="Search" />&nbsp;<button type="submit"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
          </div>
        </div>
        <div>&nbsp;</div>
        <div className="row">
          <div className="col-sm-5 col-lg-1">
            <input placeholder="From" />
          </div>
          <div className="col-sm-2">&nbsp;</div>
          <div className="col-sm-5 col-lg-1">
            <input placeholder="To" />
          </div>
        </div>
      </form>
      <div>&nbsp;</div>
      <div>
        <div className="row">
          {props.searchResults.map(searchResults)}
        </div>
      </div>
    </div>
  )
}
