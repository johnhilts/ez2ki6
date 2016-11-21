import React from 'react';

export const formatLineBreaksForHtml = (str) => {
	return str.split("\n").map(function(item) {
		return (
			<span>
			{item}
			<br/>
			</span>
		       )
	});
}
