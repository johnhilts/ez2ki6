import React from 'react';
import * as stringUtils from '../../app/util/stringutils';

test('replaces line breaks with HTML <br> tags', () => {
  let formattedHtml =
    [
			<span key="0">
				line1
				<br/>
			</span>
      ,
			<span key="1">
				line2
				<br/>
			</span>
  ]

  expect(stringUtils.formatLineBreaksForHtml('line1\nline2')).toEqual(formattedHtml);
});
