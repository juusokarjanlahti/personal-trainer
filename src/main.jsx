import "./global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import App from "./App";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import TrainingCalendar from "./components/TrainingCalendar";
import DataProvider from "./context/DataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<DataProvider>
			<HashRouter
				future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
			>
				<Routes>
					<Route path="/" element={<App />} errorElement={<Error />}>
						<Route index element={<CustomerList />} /> {/* Default route */}
						<Route path="trainings" element={<TrainingList />} />
						<Route path="calendar" element={<TrainingCalendar />} />
					</Route>
				</Routes>
			</HashRouter>
		</DataProvider>
	</React.StrictMode>
);
