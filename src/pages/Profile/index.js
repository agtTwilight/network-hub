import React from 'react';
import './style.css';

export const Profile = (props) => {
	console.log(props.user);
	return (
		<section>
			<h1>{`Hello, ${props.user.displayName}`}</h1>
		</section>
	);
};
