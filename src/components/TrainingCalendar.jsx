import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Define the locales object with the finnish locale
const locales = {
	finnish: fi,
};

// Create a localizer object with the dateFnsLocalizer function
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const API_URL = import.meta.env.VITE_API_URL;

function TrainingCalendar() {
	const [trainings, setTrainings] = useState([]);

	const fetchTrainings = async () => {
		try {
			const response = await fetch(`${API_URL}/gettrainings`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			if (data) {
				setTrainings(data);
				console.log("Trainings fetched successfully");
			} else {
				console.error("No trainings found");
			}
		} catch (error) {
			console.error("Error fetching trainings:", error);
		}
	};

	useEffect(() => {
		fetchTrainings();
	}, []);

	// Map through the trainings array and create an event object for each training
	const events = trainings.map((training) => {
		// Create a new Date object from the training date
		const trainingDate = new Date(training.date);
		return {
			title: training.activity,
			start: trainingDate,
			end: new Date(trainingDate.getTime() + training.duration * 60000),
			customer: training.customer,
		};
	});

	return (
		<div>
			<h1>Training Calendar</h1>
			<Calendar
				// Set the localizer prop to the localizer object
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				// Set the culture prop to "fi" to use the Finnish locale
				culture="finnish"
			/>
		</div>
	);
}

export default TrainingCalendar;
