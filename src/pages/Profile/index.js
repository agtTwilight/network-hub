import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NewUserSetup } from '../../components/NewUserSetup';
import email from './assets/email.png';
import github from './assets/github.png';
import google from './assets/google.png';
import linkedin from './assets/linkedin.png';
import phone from './assets/phone.png';
import venmo from './assets/venmo.png';
import './style.css';

export const Profile = (props) => {
	const [data, setData] = useState(props.profileData);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		const updateData = onSnapshot(
			doc(props.usersRef, props.userData.uid),
			(doc) => {
				return setData(doc.data());
			}
		);
	});

	const enableEdit = () => {
		setEdit(true);
	};

	const cancelEdit = () => {
		setEdit(false);
	};

	const handleEditSubmit = async () => {
		const docRef = doc(props.usersRef, props.userData.uid);
		const inputs = document.querySelectorAll('.profile-edit-input');
		const edits = {};

		inputs.forEach((input) => {
			if (input.value) {
				input.id !== 'skills'
					? (edits[input.id] = input.value)
					: (edits[input.id] = input.value.split(','));
			}
		});

		setEdit(false);
		if (Object.keys(edits).length) {
			await updateDoc(docRef, edits);
		}
	};

	// TODO make this occur on backend? Store your img assests in firebase and have them be properly referenced when your user adds a new link.
	const findSrc = (src) => {
		if (src === 'email') {
			return email;
		} else if (src === 'github') {
			return github;
		} else if (src === 'google') {
			return google;
		} else if (src === 'linkedin') {
			return linkedin;
		} else if (src === 'phone') {
			return phone;
		} else if (src === 'venmo') {
			return venmo;
		}
	};

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
					<div className="profile-header"></div>
					<div className="profile-body">
						{edit ? (
							<>
								<input
									id="name"
									className="profile-edit-input"
									placeholder={data.name}
								></input>
								<input
									id="title"
									className="profile-edit-input"
									placeholder={data.title}
								></input>
								<div id="profile-location-edit">
									<input
										id="location"
										className="profile-edit-input"
										placeholder={data.location}
									></input>
									<section className="edit-options">
										<button className="cancel-edit" onClick={cancelEdit}>
											Cancel
										</button>
										<button className="submit-edit" onClick={handleEditSubmit}>
											Submit
										</button>
									</section>
								</div>
								<hr></hr>
								<input
									id="skills"
									className="profile-edit-input"
									placeholder={data.skills}
								></input>
							</>
						) : (
							<>
								<h2>{data.name}</h2>
								<h3>{data.title}</h3>
								<div id="profile-location-edit">
									<p>{data.location}</p>
									{data.url === props.userData.uid ? (
										<button className="enable-edit" onClick={enableEdit}>
											Edit
										</button>
									) : (
										<></>
									)}
								</div>
								<hr></hr>
								<ul className="profile-skills">
									{data.skills ? (
										data.skills.map((skill, index) => (
											<li key={index}>{skill}</li>
										))
									) : (
										<></>
									)}
								</ul>
							</>
						)}
					</div>
					<section id="profile-links">
						{edit ? (
							<></>
						) : (
							<>
								{data.links ? (
									data.links.map((link, index) => (
										<a
											key={index}
											href={link.url}
											rel="noreferrer"
											target="_blank"
											className="profile-link"
										>
											<img
												src={findSrc(link.type)}
												alt={`${link.type} logo`}
											></img>
											<p>{link.description}</p>
										</a>
									))
								) : (
									<></>
								)}
							</>
						)}
					</section>
				</>
			) : (
				<></>
			)}
		</section>
	);
};
