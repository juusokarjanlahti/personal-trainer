import { provideGlobalGridOptions } from "ag-grid-community";

const globalGridOptions = {
	defaultColDef: {
		resizable: true,
		sortable: true,
		filter: true,
	},
	pagination: true,
	paginationPageSize: 10,
	paginationPageSizeSelector: [10, 25, 50, 100],
	domLayout: "autoHeight",
	onGridReady: (params) => {
		params.api.sizeColumnsToFit();
	},
};

provideGlobalGridOptions(globalGridOptions);

export default globalGridOptions;
