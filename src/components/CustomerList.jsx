import React, { useContext, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataContext } from "./DataProvider";

function CustomerList() {
	const { customers } = useContext(DataContext);
	const [columnDefs] = useState([
		{ headerName: "First Name", field: "firstname" },
		{ headerName: "Last Name", field: "lastname" },
		{ headerName: "Street Address", field: "streetaddress" },
		{ headerName: "City", field: "city" },
		{ headerName: "Postcode", field: "postcode" },
		{ headerName: "Email", field: "email" },
		{ headerName: "Phone", field: "phone" },
	]);

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
