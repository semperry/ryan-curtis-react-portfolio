import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../bootstrap";
import Icons from "../helpers/icons";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

Icons();

export default function App() {
	const { loggedInStatus, setLoggedInStatus } = useContext(AuthContext)

	const checkLoginStatus = () => {
		return axios
			.get("https://api.devcamp.space/logged_in", {
				withCredentials: true
			})
			.then(response => {
				const loggedIn = response.data.logged_in;

				if (loggedIn && loggedInStatus === "LOGGED_IN") {
					return loggedIn;
				} else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
					setLoggedInStatus("LOGGED_IN")
				} else if (!loggedIn && loggedInStatus == "LOGGED_IN") {
					setLoggedInStatus("NOT_LOGGED_IN")
				}
			})
			.catch(error => {
				console.log("Error", error);
			});
	};

	useEffect(() => {
		checkLoginStatus();
	}, [])

	function authorizedPages() {
		return [
			<Route
				key="portfolio-manager"
				path="/portfolio-manager"
				component={PortfolioManager}
			/>
		];
	}
	return (
		<div className="container">
			<Router>
				<div>
					<NavigationContainer />

					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/auth" component={Auth} />
						<Route path="/about-me" component={About} />
						<Route path="/contact" component={Contact} />
						<Route path="/blog" component={Blog} />
						<Route path="/b/:slug" component={BlogDetail} />

						{loggedInStatus === "LOGGED_IN" ? authorizedPages() : null}

						<Route exact path="/portfolio/:slug" component={PortfolioDetail} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}