import React from 'react';
import './style.css';

export const Profile = (props) => {
	return (
		<section>
			<h1>{`from firebase: ${props.user}`}</h1>
		</section>
	);
};
