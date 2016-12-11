import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import CalendarEntryContainer from '../containers/CalendarEntryContainer';

const searchResults = (day) => {
  return (
    <div key={day.key} className="col-sm-12">
      <Link to={{pathname: 'day', state: {monthInfo: day, }}}>{dateUtils.getFormattedMonthDayYear(day.year, day.month, day.day)} : {day.dateInfo}</Link>
    </div>
  )
}

const getYears = (currentYear, years, onDateChange, searchField) => {
    return (
      <select value={currentYear} onChange={onDateChange.bind(null, searchField)}>
        {years.map(year => {
          return <option key={searchField + year} value={year}>{year}</option>
        })}
      </select>
    )
}

const getMonths = (currentMonth, onDateChange, searchField) => {
  const getMonthRange = () => {
    let months = [];
    for (let m = 0; m < 12; m++) {
      months.push(m);
    }
    return months;
  }
  let months = getMonthRange();
  return (
    <select value={currentMonth} onChange={onDateChange.bind(null, searchField)}>
    {months.map(month => {
      return <option key={searchField + month} value={month}>{month+1}</option>
    })}
    </select>
  )
}

const getDays = (currentYear, currentMonth, currentDay, onDateChange, searchField) => {
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
      <select value={currentDay} onChange={onDateChange.bind(null, searchField)}>
        {days.map(day => {
          return <option key={searchField + day} value={day}>{day}</option>
        })}
      </select>
    )
}

const RenderDateRanges = (props) => {
  const getDateSelect = (years, year, month, day, onDateChange, searchYear, searchMonth, searchDay) => {
    return (
      <span>{getMonths(month, onDateChange, searchMonth)}/{getDays(year, month, day, onDateChange, searchDay)}/{getYears(year, years, onDateChange, searchYear)}</span>
    )
  }
  let searchFields = props.searchFields;
  let fromDateSelect = getDateSelect(props.years, props.fromDate.year, props.fromDate.month, props.fromDate.day, props.onDateChange,
    searchFields.fromDateYear, searchFields.fromDateMonth, searchFields.fromDateDay);
  let toDateSelect = getDateSelect(props.years, props.toDate.year, props.toDate.month, props.toDate.day, props.onDateChange,
    searchFields.toDateYear, searchFields.toDateMonth, searchFields.toDateDay);

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
      <div>&nbsp;</div>
      <CalendarEntryContainer {...props} />
    </div>
  )
}
