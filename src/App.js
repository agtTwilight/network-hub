import React from 'react';
import './App.css';

import 'fireabase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

firebase.initializeApp({
	apiKey: 'AIzaSyAJ3utzwJu2hKZRost8GK2XcYFTU5z1_bI',
	authDomain: 'nfc-app-7f535.firebaseapp.com',
	projectId: 'nfc-app-7f535',
	storageBucket: 'nfc-app-7f535.appspot.com',
	messagingSenderId: '1053572299085',
	appId: '1:1053572299085:web:12206087f4e894019c5f04',
	measurementId: 'G-XGE7TLKVFX',
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	// Check if user is signed in with google
	// logged in -> user = true. Else, user = null.
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<header></header>
			<section>
				{/* Check if user is logged in. Use terneray operator to show correct page */}
				{user ? <Profile /> : <Home />}
			</section>
		</div>
	);
}

export default App;
