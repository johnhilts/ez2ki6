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

const getYears = (currentYear, years) => {
    return (
      <select value={currentYear}>
        {years.map(year => {
          return <option key={year} value={year}>{year}</option>
        })}
      </select>
    )
}

const getMonths = (currentMonth) => {
  const getMonthRange = () => {
    let months = [];
    for (let m = 0; m < 12; m++) {
      months.push(m);
    }
    return months;
  }
  let months = getMonthRange();
  return (
    <select value={currentMonth}>
    {months.map(month => {
      return <option key={month} value={month}>{month+1}</option>
    })}
    </select>
  )
}

const getDays = (currentYear, currentMonth, currentDay) => {
    const getMonthDayRange = (year, month) => {
      let range = [];
      let end = dateUtils.getDaysByYearMonth(currentYear, currentMonth);
      for (let i = 1; i <= end; i++) {
        range.push(i);
      }
      return range;
    }
    let days = getMonthDayRange(currentYear, currentMonth);
    return (
      <select value={currentDay}>
        {days.map(day => {
          return <option key={day} value={day}>{day}</option>
        })}
      </select>
    )
}

const RenderDateRanges = (props) => {
  const getDateSelect = (years, year, month, day) => {
    return <span>{getMonths(month)}/{getDays(year, month, day)}/{getYears(year, years)}</span>
  }
  let currentDate = props.currentDate ? props.currentDate : dateUtils.getCurrentDate();
  let fromDateSelect = getDateSelect(props.years, currentDate.year, currentDate.month, currentDate.day);
  let toDateSelect = getDateSelect(props.years, currentDate.year, currentDate.month, currentDate.day);

  return (
    <div className="row">
      <div>
        From:&nbsp;{fromDateSelect}
      </div>
      <div>&nbsp;</div>
      <div>
        To:&nbsp;&nbsp;{toDateSelect}
      </div>
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
          <RenderDateRanges {...props} />
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
