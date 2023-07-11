import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NewUserSetup } from '../../components/NewUserSetup';
import './style.css';

export const Profile = (props) => {
	const [data, setData] = useState(props.profileData);

	useEffect(() => {
		const updateData = onSnapshot(
			doc(props.usersRef, props.userData.uid),
			(doc) => {
				return setData(doc.data());
			}
		);
	});

	return (
		<section className="profile">
			{data ? (
				<>
					{data.newUser ? (
						<NewUserSetup
							profileData={data}
							handleSetupSubmit={props.handleSetupSubmit}
						/>
					) : (
						<></>
					)}
					<div className="profile-header">
						<h2>{data.name}</h2>
						<h3>{data.title}</h3>
						<p>{data.location}</p>
					</div>
					<div className="profile-body"></div>
				</>
			) : (
				<></>
			)}
		</section>
	);
};
