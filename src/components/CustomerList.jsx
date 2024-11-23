import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const API_URL = import.meta.env.VITE_API_URL;

function CustomerList() {
	const [customers, setCustomers] = useState([]);
	const [columnDefs] = useState([
		{ headerName: "First Name", field: "firstname" },
		{ headerName: "Last Name", field: "lastname" },
		{ headerName: "Street Address", field: "streetaddress" },
		{ headerName: "City", field: "city" },
		{ headerName: "Postcode", field: "postcode" },
		{ headerName: "Email", field: "email" },
		{ headerName: "Phone", field: "phone" },
	]);

	const fetchCustomers = () => {
		fetch(`${API_URL}/customers`, {
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
		<div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
			<h1>Customers</h1>
			<AgGridReact
				rowData={customers}
				columnDefs={columnDefs}
				pagination={true}
				paginationPageSize={10}
			/>
		</div>
	);
}

export default CustomerList;
