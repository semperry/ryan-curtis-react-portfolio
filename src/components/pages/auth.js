import React from "react";
import Login from "../auth/login"
import loginImg from "../../../static/assets/images/auth/login.jpg";

export default function Auth(props) {

	const handleSuccessfulAuth = () => {
		props.handleSuccessfulLogin();
		props.history.push("/");
	}

	const handleUnuccessfulAuth = () => {
		props.handleUnsuccessfulLogin();
	}

	return (
		<div className="auth-page-wrapper">
			<div
				className="left-column"
				style={{
					backgroundImage: `url(${loginImg})`
				}}
			/>

			<div className="right-column">
				<Login
					handleSuccessfulAuth={handleSuccessfulAuth}
					handleUnuccessfulAuth={handleUnuccessfulAuth}
				/>
			</div>
		</div>
	);
}