import React from 'react';
import 'style.css';

export const NewUserSetup = (props) => {
	const handleQuestionNext = () => {};
	const handleQuestionBack = () => {};
	const handleFormSubmit = () => {};
	return (
		<section className="setup-modal">
			<h1>{`Welcome, ${props.profileData.name}`}</h1>
			<h2>
				To get the most out of your account, tell us a little about yourself!
			</h2>
			<section className="setup-questions">
				<div id="question-1">
					<p>What is your title?</p>
					<input type="text" placeholder="Your Title"></input>
					<button onClick={handleQuestionNext}></button>
				</div>
				<div id="question-2">
					<p>Where do you work?</p>
					<input type="text" placeholder="Your Location"></input>
					<button onClick={handleQuestionBack}></button>
					<button onClick={handleQuestionNext}></button>
				</div>
				<div id="question-3">
					<p>What three skills would you like to highlight?</p>
					<input type="text" placeholder="Skill 1"></input>
					<input type="text" placeholder="Skill 2"></input>
					<input type="text" placeholder="Skill 3"></input>
					<button onClick={handleQuestionBack}></button>
					<button onClick={handleFormSubmit}></button>
				</div>
			</section>
		</section>
	);
};
