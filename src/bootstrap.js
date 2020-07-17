import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";

import App from "./components/app";
import "./style/main.scss";

export const AuthContext = createContext()

function Main() {
	const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")

	return (
		<AuthContext.Provider value={{ loggedInStatus, setLoggedInStatus }}>
			<App />
		</AuthContext.Provider>
	)
}

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));
})

