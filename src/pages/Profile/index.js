import React from 'react';
import { NewUserSetup } from '../../components/NewUserSetup';
import './style.css';

export const Profile = (props) => {
	return (
		<section className="profile">
			{props.profileData ? (
				<>
					{props.profileData.newUser ? <NewUserSetup /> : <></>}
					<div className="profile-header">
						<h2>{props.profileData.name}</h2>
						<h3>{props.profileData.title}</h3>
						<p>{props.profileData.location}</p>
					</div>
					<div className="profile-body"></div>
				</>
			) : (
				<></>
			)}
		</section>
	);
};
