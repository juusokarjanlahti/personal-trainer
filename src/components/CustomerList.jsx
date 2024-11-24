import React, { useContext, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataContext } from "../context/DataProvider";
import globalGridOptions from "../globalGridOptions";
import AddCustomerForm from "./AddCustomerForm"; // Import AddCustomerForm


function CustomerList() {
	const { customers } = useContext(DataContext);
	const [columnDefs, setColumnDefs] = useState([
		{ headerName: "First Name", field: "firstname" },
		{ headerName: "Last Name", field: "lastname" },
		{ headerName: "Street Address", field: "streetaddress" },
		{ headerName: "City", field: "city" },
		{ headerName: "Postcode", field: "postcode" },
		{ headerName: "Email", field: "email" },
		{ headerName: "Phone", field: "phone" },
	]);

	return (
		<div className="ag-theme-alpine" style={{ height: "100vh", width: "100%" }}>
			<h1>Customers</h1>
			<AddCustomerForm /> {/* Include AddCustomerForm */}
			<AgGridReact
				rowData={customers}
				columnDefs={columnDefs}
				{...globalGridOptions}
			/>
		</div>
	);
}

export default CustomerList;
