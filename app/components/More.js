import React from 'react';
import { Link } from 'react-router'
import * as dateUtils from '../util/dateutils';
import * as themeUtils from '../util/themeutils';
import CalendarEntryContainer from '../containers/CalendarEntryContainer';

const searchResults = (day) => {
  return (
    <div key={day.key} className="col-sm-12">
      <Link to={{pathname: 'day', state: {dayInfo: day, }}}>{dateUtils.getFormattedMonthDayYear(day.year, day.month, day.day)} : {day.dateInfo}</Link>
    </div>
  )
}

const getCommonDateSelect = (currentElement, onDateChange, searchField, items) => {
  return (
    <select value={currentElement} onChange={onDateChange.bind(null, searchField)} className='invertedText'>
      {items}
    </select>
  )
}

const getYearsSelect = (currentYear, years, onDateChange, searchField) => {
  const listOfYears = (year) => { return <option key={searchField + year} value={year}>{year}</option> }
    return (
      getCommonDateSelect(currentYear, onDateChange, searchField, years.map(listOfYears))
    )
}

const getMonthsSelect = (currentMonth, onDateChange, searchField) => {
  const getMonthRange = () => {
    let months = [];
    for (let m = 0; m < 12; m++) {
      months.push(m);
    }
    return months;
  }
  let months = getMonthRange();
  const listOfMonths = (month) => {return <option key={searchField + month} value={month}>{month+1}</option>}
  return (
    getCommonDateSelect(currentMonth, onDateChange, searchField, months.map(listOfMonths))
  )
}

const getDaysSelect = (currentYear, currentMonth, currentDay, onDateChange, searchField) => {
    const getMonthDayRange = (year, month) => {
      let range = [];
      let end = dateUtils.getDaysByYearMonth(currentYear, currentMonth);
      for (let i = 1; i <= end; i++) {
        range.push(i);
      }
      return range;
    }
    let days = getMonthDayRange(currentYear, currentMonth);
    const listOfDays = (day) => {return <option key={searchField + day} value={day}>{day}</option>}
      return (
        getCommonDateSelect(currentDay, onDateChange, searchField, days.map(listOfDays))
      )
    }

const RenderDateRanges = (props) => {
  const getDateSelect = (years, year, month, day, onDateChange, searchYear, searchMonth, searchDay) => {
    return (
      <span>
        {getMonthsSelect(month, onDateChange, searchMonth)}
          /
          {getDaysSelect(year, month, day, onDateChange, searchDay)}
          /
          {getYearsSelect(year, years, onDateChange, searchYear)}
      </span>
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

const RenderThemeChoices = (props) => {
  let themes = themeUtils.themes;
  let selectedThemeId = props.user.themeId;
  return (
    <div>
      <label htmlFor="dark-theme">Dark Theme</label>&nbsp;<input type="radio" name="theme" id="dark-theme" value={themes.dark.id} onChange={props.onThemeChange} checked={selectedThemeId==themes.dark.id} />
      &nbsp;&nbsp;
      <label htmlFor="light-theme">Light Theme</label>&nbsp;<input type="radio" name="theme" id="light-theme" value={themes.light.id} onChange={props.onThemeChange} checked={selectedThemeId==themes.light.id} />
    </div>
  )
}

export default function More(props) {
  return (
    <div>
      <form onSubmit={props.onSearch}>
        <div className="row">
          <div className="col-sm-12 invertedText">
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
      <div>&nbsp;</div>
      <RenderThemeChoices {...props} />
    </div>
  )
}
