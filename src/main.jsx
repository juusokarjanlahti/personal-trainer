import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import App from "./App";
import Welcome from "./components/Welcome";
import Customers from "./components/CustomerList";
import Trainings from "./components/TrainingList";
import TrainingCalendar from "./components/TrainingCalendar";
import DataProvider from "./context/DataProvider";
import Statistics from "./components/Statistics";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<DataProvider>
			<HashRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Welcome />} /> {/* Default route */}
						<Route path="customers" element={<Customers />} />
						<Route path="trainings" element={<Trainings />} />
						<Route path="calendar" element={<TrainingCalendar />} />
						<Route path="statistics" element={<Statistics />} />
					</Route>
				</Routes>
			</HashRouter>
		</DataProvider>
	</React.StrictMode>
);
