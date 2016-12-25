import React from 'react';

export const weekdayHeader = (weekdayName) => {
  return (
    <th key={weekdayName} style={{textAlign: 'center', }}>{weekdayName}</th>
  )
}
