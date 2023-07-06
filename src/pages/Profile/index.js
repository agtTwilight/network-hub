import React from 'react';
import './style.css';

export const Profile = (props) => {
	console.log(props.profileData);
	return (
		<section>
			<h1>{`Hello, ${props.userData.displayName}`}</h1>
		</section>
	);
};
