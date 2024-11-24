import React, { useContext, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataContext } from "../context/DataProvider";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import globalGridOptions from "../globalGridOptions";

function TrainingList() {
	const { trainings, setTrainings } = useContext(DataContext);
	const [selectedRows, setSelectedRows] = useState([]);

	const [columnDefs] = useState(
		[
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
		],
		[]
	);

	const onSelectionChanged = (params) => {
		setSelectedRows(params.api.getSelectedRows());
	};

	const deleteSelectedRows = () => {
		if (
			window.confirm("Are you sure you want to delete the selected trainings?")
		) {
			const selectedIds = selectedRows.map((row) => row.id);
			const updatedTrainings = trainings.filter(
				(training) => !selectedIds.includes(training.id)
			);
			setTrainings(updatedTrainings);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				width: "100%",
			}}
		>
			<h1>Training Sessions</h1>
			<button onClick={deleteSelectedRows} disabled={selectedRows.length === 0}>
				Delete Selected
			</button>
			<div
				className="ag-theme-alpine"
				style={{ height: "100vh", width: "100%" }}
			>
				<h1>Training Sessions</h1>
				<AgGridReact
					rowData={trainings}
					columnDefs={columnDefs}
					rowSelection="single"
					onSelectionChanged={onSelectionChanged}
					{...globalGridOptions}
				/>
			</div>
		</div>
	);
}

export default TrainingList;
