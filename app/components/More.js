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

const getYears = (currentYear) => {
    let years = [2015, 2016];
    return (
      <select value={currentYear}>
        {years.map(year => {
          return <option key={year} value={year}>{year}</option>
        })}
      </select>
    )
}

const getMonths = (currentMonth) => {
    let months = [1,2,3,4,5,6,7,8,9,10,11,12,];
    return (
      <select value={currentMonth+1}>
        {months.map(month => {
          return <option key={month} value={month}>{month}</option>
        })}
      </select>
    )
}

const getDays = (currentYear, currentMonth, currentDay) => {
    const getMonthDayRange = (year, month) => {
      let range = [];
      let end = 31;
      switch (month+1) {
        case 2:
          end = 28;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          end = 30;
          break;
      }
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

export default function More(props) {
  let currentDate = dateUtils.getCurrentDate();
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
          <div>
            From:&nbsp;{getMonths(currentDate.month)}/{getDays(currentDate.year, currentDate.month, currentDate.day)}/{getYears(currentDate.year)}
          </div>
          <div>&nbsp;</div>
          <div>
            To:&nbsp;&nbsp;{getMonths(currentDate.month)}/{getDays(currentDate.year, currentDate.month, currentDate.day)}/{getYears(currentDate.year)}
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
