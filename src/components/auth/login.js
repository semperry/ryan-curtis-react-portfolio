import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Login(props) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorText, setErrorText] = useState("")

	const handleSubmit = event => {
		event.preventDefault();

		axios
			.post(
				"https://api.devcamp.space/sessions",
				{
					client: {
						email,
						password
					}
				},
				{ withCredentials: true }
			)
			.then(response => {
				if (response.data.status === "created") {
					props.handleSuccessfulAuth();
				} else {
					setErrorText("Wrong email or password")
					props.handleUnuccessfulAuth();
				}
			})
			.catch(error => {
				setErrorText("An Error Occured")
				props.handleUnuccessfulAuth();
			});
	};

	return (
		<div>
			<h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

			<div>{errorText}</div>

			<form onSubmit={handleSubmit} className="auth-form-wrapper">
				<div className="form-group">
					<FontAwesomeIcon icon="envelope" />
					<input
						type="email"
						placeholder="Your email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						onFocus={() => setErrorText("")}
					/>
				</div>
				<div className="form-group">
					<FontAwesomeIcon icon="lock" />

					<input
						type="password"
						name="password"
						placeholder="Your password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						onFocus={() => setErrorText("")}
					/>
				</div>

				<button type="submit" className="btn">Login</button>
			</form>
		</div>
	);
}