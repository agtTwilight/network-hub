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
import { getFirestore } from 'firebase/firestore';

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

function App() {
	const [user, setUser] = useState(null);

	// Check if user is signed in
	// TODO learn how to make page render after this effect is finished (don't want sign in to render initially, and then change after callback returns user))
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				console.log('no user');
			}
		});
	}, [user]);

	return (
		<div className="App">
			<header></header>
			<section>{user ? <Profile /> : <SignIn />}</section>
		</div>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
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

export default App;