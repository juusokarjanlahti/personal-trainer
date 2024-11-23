import React from "react";
import { Link, Outlet } from "react-router";
import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>Personal Trainer Dashboard</h1>
			<nav>
				<ul>
					<li>
						<Link to="/">Customers</Link>
					</li>
					<li>
						<Link to="trainings">Training Sessions</Link>
					</li>
					<li>
						<Link to="calendar">Training Calendar</Link>
					</li>
				</ul>
			</nav>
			<Outlet /> {/* This will render the matched child route component */}
		</div>
	);
}

export default App;
