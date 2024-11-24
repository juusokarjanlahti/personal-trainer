import React, { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const DataProvider = ({ children }) => {
	const [customers, setCustomers] = useState([]);
	const [trainings, setTrainings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const customerRes = await fetch(`${API_URL}/customers`);
				const customerData = await customerRes.json();

				const trainingRes = await fetch(`${API_URL}/gettrainings`);
				const trainingData = await trainingRes.json();

				setCustomers(customerData._embedded.customers);
				setTrainings(trainingData);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return loading ? (
		<div>Loading...</div>
	) : (
		<DataContext.Provider value={{ customers, trainings }}>
			{children}
		</DataContext.Provider>
	);
};

export default DataProvider;
