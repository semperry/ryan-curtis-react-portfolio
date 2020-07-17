import React, { useContext } from "react";

import Login from "../auth/login"
import loginImg from "../../../static/assets/images/auth/login.jpg";
import { AuthContext } from "../../bootstrap";

export default function Auth(props) {
	const { loggedInStatus, setLoggedInStatus } = useContext(AuthContext)
	const handleSuccessfulAuth = () => {
		setLoggedInStatus("LOGGED_IN")
		props.history.push("/");
	}

	const handleUnuccessfulAuth = () => {
		setLoggedInStatus("NOT_LOGGED_IN")
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