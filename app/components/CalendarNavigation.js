import React from 'react';
import * as dateUtils from '../util/dateutils';

export default function CalendarNavigation(props) {

  return (
    <div className="col-sm-4 col-lg-3" style={{verticalAlign: 'middle', }}>
      <h2>{props.previousLink} {props.title} {props.nextLink}</h2>
    </div>
  )
}
