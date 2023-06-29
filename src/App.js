import React from 'react';
import './App.css';
import { Profile } from './pages/Profile';

// initialize firebase sdk & firestore instance
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
	// Check if user is signed in with google
	// logged in -> user = true. Else, user = null.
	const user = auth.currentUser;
	console.log(auth);

	return (
		<div className="App">
			<header></header>
			<section>
				{/* Check if user is logged in. Use terneray operator to show correct page */}
				{user ? <Profile user={auth.currentUser} /> : <SignIn />}
			</section>
		</div>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebaseApp.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}

export default App;
