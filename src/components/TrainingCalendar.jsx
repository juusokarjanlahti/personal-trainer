import React, { useContext, useMemo, Fragment } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DataContext } from "../context/DataProvider";

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

function TrainingCalendar() {
	const { trainings } = useContext(DataContext); // Access trainings from DataContext
  
	// Map through the trainings array and create an event object for each training
	const events = trainings.map((training) => {
	  // Create a new Date object from the training date
	  const trainingDate = new Date(training.date);
	  return {
		title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
		start: trainingDate,
		end: new Date(trainingDate.getTime() + training.duration * 60000),
		customer: training.customer,
	  };
	});

	const defaultDate = useMemo(() => new Date(), []);

	return (
		<Fragment>
			<div className="container">
				<h1>Training Calendar</h1>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }}
					culture="finnish"
					popup
					defaultDate={defaultDate}
				/>
			</div>
		</Fragment>
	);
}

export default TrainingCalendar;
