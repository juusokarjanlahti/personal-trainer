import React, { useContext, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataContext } from "../context/DataProvider";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import globalGridOptions from "../globalGridOptions";
import AddTrainingForm from "./AddTrainingForm";

const API_URL = import.meta.env.VITE_API_URL;

function TrainingList() {
	const { trainings, setTrainings } = useContext(DataContext);
	const [selectedRows, setSelectedRows] = useState([]);

	const columnDefs = useMemo(() => [
		{
			headerName: "Date",
			field: "date",
			valueFormatter: ({ value }) => format(new Date(value), "dd.MM.yyyy HH:mm", { locale: fi }),
			editable: true,
			cellEditor: "agDateCellEditor",
    },
			{ headerName: "Duration (minutes)", field: "duration", editable: true },
			{ headerName: "Activity", field: "activity", editable: true },
		], []);

	const onSelectionChanged = (params) => {
		setSelectedRows(params.api.getSelectedRows());
	};

	const onCellEditingStopped = async (params) => {
		const updatedTraining = params.data;
		const trainingId = updatedTraining.id;

		try {
			const response = await fetch(`${API_URL}/trainings/${trainingId}`, {
			  method: 'PUT',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(updatedTraining),
			});
	  
			if (!response.ok) {
			  throw new Error('Failed to update training');
			}
	  
			const updatedTrainingData = await response.json();
			setTrainings((prevTrainings) =>
			  prevTrainings.map((training) =>
				training.id === updatedTrainingData.id ? updatedTrainingData : training
			  )
			);
		  } catch (error) {
			console.error(error);
		  }
		};

	const deleteSelectedRows = async () => {
		if (window.confirm("Are you sure you want to delete the selected training(s)?")) {
		  const selectedIds = selectedRows.map((row) => row.id);
	
		  // Perform DELETE requests for each selected training session
		  await Promise.all(selectedIds.map(async (id) => {
			try {
			  const response = await fetch(`${API_URL}/trainings/${id}`, {
				method: 'DELETE',
			  });
			  if (!response.ok) {
				throw new Error(`Failed to delete training with id ${id}`);
			  }
			} catch (error) {
			  console.error(error);
			}
		  }));
	
		  // Update the state after successful deletion
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
			<AddTrainingForm />
			<button onClick={deleteSelectedRows} disabled={selectedRows.length === 0}>
				Delete Selected
			</button>
			<div className="ag-theme-alpine" style={{ flex: 1, width: '100%' }}>
				<h1>Training Sessions</h1>
				<AgGridReact
					rowData={trainings}
					columnDefs={columnDefs}
					onSelectionChanged={onSelectionChanged}
					onCellEditingStopped={onCellEditingStopped}
					{...globalGridOptions}
				/>
			</div>
		</div>
	);
}

export default TrainingList;
