import React from 'react';

export const formatLineBreaksForHtml = (str) => {
	return str.split("\n").map(function(item, index) {
		return (
			<span key={index}>
				{item}
				<br/>
			</span>
		       )
	});
}
