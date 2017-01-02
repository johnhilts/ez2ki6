import React from 'react';
import {expect} from 'chai';
import * as stringUtils from '../../app/util/stringutils';

describe('stringUtils', () => {
  it('replaces line breaks with HTML <br> tags', () => {
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

    expect(stringUtils.formatLineBreaksForHtml('line1\nline2')).to.eql(formattedHtml);
  });
})
