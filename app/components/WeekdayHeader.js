import React from 'react';

export default function WeekdayHeader(weekdayName) {
  return (
    <th key={weekdayName} style={{textAlign: 'center', }}>{weekdayName}</th>
  )
}
