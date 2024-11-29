import React, { useContext, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DataContext } from "../context/DataProvider";
import globalGridOptions from "../globalGridOptions";
import AddCustomerForm from "./AddCustomerForm"; // Import AddCustomerForm

const API_URL = import.meta.env.VITE_API_URL;

function CustomerList() {
	const { customers, setCustomers } = useContext(DataContext);
	const [selectedRows, setSelectedRows] = useState([]);

	const columnDefs = useMemo(() => [
    { headerName: "First Name", field: "firstname", editable: true },
    { headerName: "Last Name", field: "lastname", editable: true },
    { headerName: "Street Address", field: "streetaddress", editable: true },
    { headerName: "City", field: "city", editable: true },
    { headerName: "Postcode", field: "postcode", editable: true },
    { headerName: "Email", field: "email", editable: true },
    { headerName: "Phone", field: "phone", editable: true },
  ], []);

	const onSelectionChanged = (params) => {
		setSelectedRows(params.api.getSelectedRows());
	  };

	  const deleteSelectedRows = async () => {
		if (window.confirm("Are you sure you want to delete the selected customer(s)?")) {
		  const selectedIds = selectedRows.map((row) => row._links.self.href.split('/').pop());
	
		  // Perform DELETE requests for each selected customer
		  await Promise.all(selectedIds.map(async (id) => {
			try {
			  const response = await fetch(`${API_URL}/customers/${id}`, {
				method: 'DELETE',
			  });
			  if (!response.ok) {
				throw new Error(`Failed to delete customer with id ${id}`);
			  }
			} catch (error) {
			  console.error(error);
			}
		  }));
	
		  // Update the state after successful deletion
		  const updatedCustomers = customers.filter(
			(customer) => !selectedIds.includes(customer._links.self.href.split('/').pop())
		  );
		  setCustomers(updatedCustomers);
		}
	  };

	  const onCellEditingStopped = async (params) => {
		const updatedCustomer = params.data;
		const customerId = updatedCustomer._links.self.href.split('/').pop(); // Extract the customer ID


		try {
			const response = await fetch(`${API_URL}/customers/${customerId}`, {
			  method: 'PUT',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(updatedCustomer),
			});
	  
			if (!response.ok) {
			  throw new Error('Failed to update customer');
			}
	  
			const updatedCustomerData = await response.json();
			setCustomers((prevCustomers) =>
			  prevCustomers.map((cust) =>
				cust._links.self.href.split('/').pop() === updatedCustomerData.id ? updatedCustomerData : cust
			  )
			);
		  } catch (error) {
			console.error(error);
		  }
		};

	return (
		<div className="ag-theme-alpine" style={{ height: "100vh", width: "100%" }}>
			<h1>Customers</h1>
			<AddCustomerForm /> {/* Include AddCustomerForm */}
			<button onClick={deleteSelectedRows} disabled={selectedRows.length === 0}>
        Delete Selected
      </button>
			<AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        onSelectionChanged={onSelectionChanged}
        onCellEditingStopped={onCellEditingStopped} // Handle cell editing stopped
        {...globalGridOptions}
      />
		</div>
	);
}

export default CustomerList;
