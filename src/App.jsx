import React from "react";
import { Link, Outlet } from "react-router";
import "./App.css";

function App() {
	return (
	  <div className="App">
		<nav>
		  <ul>
			<li>
			  <Link to="/">Welcome</Link>
			</li>
			<li>
			  <Link to="customers">Customers</Link>
			</li>
			<li>
			  <Link to="trainings">Training Sessions</Link>
			</li>
			<li>
			  <Link to="calendar">Training Calendar</Link>
			</li>
			<li>
			  <Link to="statistics">Statistics</Link>
			</li>
		  </ul>
		</nav>
		<div className="container">
		  <Outlet /> {/* This will render the matched child route component */}
		</div>
	  </div>
	);
  }

export default App;
