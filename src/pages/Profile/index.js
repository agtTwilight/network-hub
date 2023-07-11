import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NewUserSetup } from '../../components/NewUserSetup';
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
								<input
									id="location"
									className="profile-edit-input"
									placeholder={data.location}
								></input>
								<input
									id="skills"
									className="profile-edit-input"
									placeholder={data.skills}
								></input>
								<section className="edit-options">
									<button className="cancel-edit" onClick={cancelEdit}>
										Cancel
									</button>
									<button className="submit-edit" onClick={handleEditSubmit}>
										Submit
									</button>
								</section>
							</>
						) : (
							<>
								<h2>{data.name}</h2>
								<h3>{data.title}</h3>
								<p>{data.location}</p>
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
								{data.url === props.userData.uid ? (
									<button className="enable-edit" onClick={enableEdit}>
										Edit
									</button>
								) : (
									<></>
								)}
							</>
						)}
					</div>
					<ul className="profile-links">
						{data.links ? (
							data.links.map((link, index) => <li key={index}>{link}</li>)
						) : (
							<></>
						)}
					</ul>
				</>
			) : (
				<></>
			)}
		</section>
	);
};
