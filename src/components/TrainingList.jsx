import React, { useContext, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataContext } from "../context/DataProvider";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import globalGridOptions from "../globalGridOptions";

function TrainingList() {
	const { trainings } = useContext(DataContext);
	const [columnDefs] = useState([
		{ headerName: "Activity", field: "activity" },
		{
			headerName: "Date",
			field: "date",
			valueFormatter: ({ value }) =>
				format(new Date(value), "dd.MM.yyyy HH:mm", { locale: fi }),
		},
		{ headerName: "Duration (minutes)", field: "duration" },
		{ headerName: "Customer First Name", field: "customer.firstname" },
		{ headerName: "Customer Last Name", field: "customer.lastname" },
		{ headerName: "Customer Address", field: "customer.streetaddress" },
		{ headerName: "Customer City", field: "customer.city" },
		{ headerName: "Customer Postcode", field: "customer.postcode" },
		{ headerName: "Customer Email", field: "customer.email" },
		{ headerName: "Customer Phone", field: "customer.phone" },
	]);

	return (
		<div className="ag-theme-alpine" style={{ height: "100vh", width: "100%" }}>
			<h1>Training Sessions</h1>
			<AgGridReact
				rowData={trainings}
				columnDefs={columnDefs}
				{...globalGridOptions}
			/>
		</div>
	);
}

export default TrainingList;
