import React, { useEffect, useState } from 'react';
import './App.css';
import { Profile } from './pages/Profile';

// initialize firebase sdk & firestore instance
import { initializeApp } from 'firebase/app';
import {
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
} from 'firebase/auth';
import {
	Firestore,
	collection,
	doc,
	getDoc,
	getFirestore,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyAJ3utzwJu2hKZRost8GK2XcYFTU5z1_bI',
	authDomain: 'nfc-app-7f535.firebaseapp.com',
	projectId: 'nfc-app-7f535',
	storageBucket: 'nfc-app-7f535.appspot.com',
	messagingSenderId: '1053572299085',
	appId: '1:1053572299085:web:12206087f4e894019c5f04',
	measurementId: 'G-XGE7TLKVFX',
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const usersRef = collection(db, 'users');

function App() {
	const [userData, setUserData] = useState(null);
	const [profileData, setProfileData] = useState(null);

	// Check if user is signed in
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUserData(user);
				setProfileData(await getProfileData(user.uid));
				console.log(profileData);
			} else {
				console.log('no user');
			}
		});
	}, []);

	const getProfileData = async (uid) => {
		const docRef = doc(usersRef, uid);
		const docSnap = await getDoc(docRef);

		return docSnap.data();
	};

	const handleSetupSubmit = async () => {
		const docRef = doc(usersRef, userData.uid);
		console.log(docRef);
		await updateDoc(docRef, {
			newUser: false,
			title: document.getElementById('title-input').value,
			location: document.getElementById('location-input').value,
			skills: ['Firebase'],
		});
	};

	return (
		<div className="App">
			<header></header>
			<section>
				{userData ? (
					<Profile
						userData={userData}
						profileData={profileData}
						handleSetupSubmit={handleSetupSubmit}
						usersRef={usersRef}
					/>
				) : (
					<SignIn />
				)}
			</section>
		</div>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				if (result._tokenResponse.isNewUser) {
					newUserSignUp(result.user);
				}
			})
			.catch((err) => {
				throw err;
			});
	};

	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

// TODO setup signout
function SignOut() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}

const newUserSignUp = async (user) => {
	await setDoc(doc(usersRef, user.uid), {
		newUser: true,
		name: user.displayName,
		location: null,
		title: null,
		skills: [],
		links: [],
		url: user.uid,
	});
	console.log(`succesfully registered ${user.displayName}!`);
};

export default App;
