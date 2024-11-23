import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function CustomerList() {
	const [customers, setCustomers] = useState([]);

	const fetchCustomers = () => {
		fetch(`${API_URL}customers`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data._embedded && data._embedded.customers) {
					setCustomers(data._embedded.customers);
					console.log("Customers fetched successfully");
				} else {
					console.error("No customers found");
				}
			})
			.catch((error) => console.error("Error fetching customers:", error));
	};

	useEffect(() => fetchCustomers(), []);

	return (
		<>
			<h1>Customers</h1>
			<ul>
				{customers.map(
					// Map through the customers array and display the customer details
					({
						// Destructure the customer object
						_links,
						firstname,
						lastname,
						streetaddress,
						city,
						postcode,
						email,
						phone,
					}) => (
						// Key attribute and unique identifier for each customer
						<li key={_links.self.href}>
							<p>First Name: {firstname}</p>
							<p>Last Name: {lastname}</p>
							<p>
								Address: {streetaddress}, {city}, {postcode}
							</p>
							<p>Email: {email}</p>
							<p>Phone: {phone}</p>
						</li>
					)
				)}
			</ul>
		</>
	);
}

export default CustomerList;
