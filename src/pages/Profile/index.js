import {
	FieldValue,
	arrayRemove,
	arrayUnion,
	doc,
	onSnapshot,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewUserSetup } from '../../components/NewUserSetup';
import email from './assets/email.png';
import github from './assets/github.png';
import google from './assets/google.png';
import linkedin from './assets/linkedin.png';
import phone from './assets/phone.png';
import placeholder from './assets/placeholder.jpeg';
import plus from './assets/plus.png';
import trash from './assets/trash.png';
import venmo from './assets/venmo.png';
import './style.css';

export const Profile = (props) => {
	const [data, setData] = useState(props.profileData);
	const [display, setDisplay] = useState('none');
	const [edit, setEdit] = useState(false);
	const [profilePicture, setProfilePicture] = useState(null);
	const [imageUpload, setImageUpload] = useState(null);

	// listen to update to userData in firestore
	useEffect(() => {
		if (props.userData) {
			const updateData = onSnapshot(
				doc(props.usersRef, props.userData.uid),
				(doc) => {
					return setData(doc.data());
				}
			);
		}
	});

	// get a users profile picture on page load
	// useEffect(() => {
	// 	if (props.userData) {
	// 		if (props.profileData) {
	// 			if (props.profileData.profilePictureUrl == null) {
	// 			}
	// 		}
	// 	}
	// }, []);

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

		if (imageUpload !== null) {
			await handleImageUpload();
			const url = await getProfilePicture(props.userData.uid);
			edits['profilePictureUrl'] = url;
		}

		console.log(edits);

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

	const showNewLinkModal = () => {
		setDisplay('block');
	};

	const hideNewLinkModal = () => {
		setDisplay('none');
	};

	const createNewLink = async (e) => {
		const docRef = doc(props.usersRef, props.userData.uid);
		const form = e.target.parentNode;
		const linkData = {
			type: form.children[0].value,
			url: form.children[1].value,
			description: form.children[2].value,
		};

		form.children[1].value = '';
		form.children[2].value = '';

		setDisplay('none');

		await updateDoc(docRef, {
			links: arrayUnion(linkData),
		});
	};

	const deleteLink = async (e) => {
		const docRef = doc(props.usersRef, props.userData.uid);
		const form = e.target.parentNode;
		const linkData = {
			type: form.children[0].value,
			url: form.children[1].placeholder,
			description: form.children[2].placeholder,
		};

		await updateDoc(docRef, {
			links: arrayRemove(linkData),
		});
	};

	const handleImageUpload = async () => {
		const imageRef = ref(
			props.storage,
			`images/profile_pictures/${props.userData.uid}`
		);
		await uploadBytes(imageRef, imageUpload);
	};

	const getProfilePicture = async (uid) => {
		const profilePictureReference = ref(
			props.storage,
			`images/profile_pictures/${uid}`
		);

		const url = await getDownloadURL(profilePictureReference).then(
			(url) => {
				setProfilePicture(url);
				return url;
			},
			(err) => {
				return true;
			}
		);

		return url;
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
					<div className="profile-header">
						<img
							id="profile-picture"
							src={
								props.profileData
									? props.profileData.profilePictureUrl
									: profilePicture
									? profilePicture
									: placeholder
							}
							alt="portrait"
						></img>
						{edit ? (
							<input
								id="profile-picture-select"
								type="file"
								accept="image/png, image/gif, image/jpeg"
								onChange={(event) => {
									setImageUpload(event.target.files[0]);
								}}
							></input>
						) : (
							<></>
						)}
					</div>
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
										<button className="cancel-button" onClick={cancelEdit}>
											Cancel
										</button>
										<button
											className="submit-button"
											onClick={handleEditSubmit}
										>
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
									{props.userData ? (
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
							<>
								{data.links ? (
									data.links.map((link, index) => {
										return (
											<div className="link-input" key={index}>
												<select defaultValue={link.type}>
													<option value="email">Email</option>
													<option value="github">Github</option>
													<option value="google">Google</option>
													<option value="linkedin">Linkedin</option>
													<option value="phone">Phone</option>
													<option value="venmo">Venmo</option>
												</select>
												<input placeholder={link.url}></input>
												<input placeholder={link.description}></input>
												<img
													src={trash}
													alt="a garbage can"
													onClick={deleteLink}
												></img>
											</div>
										);
									})
								) : (
									<></>
								)}
								<div id="new-link-form" className={display + ' link-input'}>
									<select required>
										<option value="email">Email</option>
										<option value="github">Github</option>
										<option value="google">Google</option>
										<option value="linkedin">Linkedin</option>
										<option value="phone">Phone</option>
										<option value="venmo">Venmo</option>
									</select>
									<input placeholder="URL" required></input>
									<input placeholder="Description" required></input>
									<button className="cancel-button" onClick={hideNewLinkModal}>
										Cancel
									</button>
									<button className="submit-button" onClick={createNewLink}>
										Create
									</button>
								</div>
								<img
									src={plus}
									alt="A plus sign"
									id="add-link"
									onClick={showNewLinkModal}
								></img>
							</>
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
												className="profile-links-preview-img"
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
