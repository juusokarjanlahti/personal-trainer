import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function TrainingList() {
	const [trainings, setTrainings] = useState([]);

	const fetchTrainings = () => {
		fetch(`${API_URL}/gettrainings`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setTrainings(data);
					console.log("Trainings fetched successfully");
				} else {
					console.error("No trainings found");
				}
			})
			.catch((error) => console.error("Error fetching trainings:", error));
	};

	useEffect(() => {
		fetchTrainings();
	}, []);

	return (
		<>
			<h1>Training Sessions</h1>
			<ul>
				{trainings.map(({ id, date, duration, activity, customer }) => (
					// Map through the trainings array and display the training details
					// Destructure the training object
					<li key={id}>
						<p>Activity: {activity}</p>
						<p>Date: {new Date(date).toLocaleString()}</p>
						<p>Duration: {duration} minutes</p>
						<h3>Customer Information:</h3>
						<p>First Name: {customer.firstname}</p>
						<p>Last Name: {customer.lastname}</p>
						<p>
							Address: {customer.streetaddress}, {customer.city},{" "}
							{customer.postcode}
						</p>
						<p>Email: {customer.email}</p>
						<p>Phone: {customer.phone}</p>
					</li>
				))}
			</ul>
		</>
	);
}

export default TrainingList;
