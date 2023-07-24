import React from 'react';
import './style.css';

export const NewUserSetup = (props) => {
	return (
		<section className="setup-modal">
			<h2>{`Welcome, ${props.profileData.name}`}</h2>
			<h3>Tell us a little about yourself!</h3>
			<section className="setup-questions">
				<div id="question-1">
					<p>What is your job title?</p>
					<input id="title-input" type="text" placeholder="Your Title"></input>
				</div>
				<div id="question-2">
					<p>Where do you work?</p>
					<input
						id="location-input"
						type="text"
						placeholder="Your Location"
					></input>
				</div>
				<div id="question-3">
					<p>What three skills would you like to highlight?</p>
					<input
						className="skill-input"
						type="text"
						placeholder="Skill 1"
					></input>
					<input
						className="skill-input"
						type="text"
						placeholder="Skill 2"
					></input>
					<input
						className="skill-input"
						type="text"
						placeholder="Skill 3"
					></input>
					<button className="submit-button" onClick={props.handleSetupSubmit}>
						Done
					</button>
				</div>
			</section>
		</section>
	);
};
