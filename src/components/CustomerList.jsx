import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import CustomerForm from "./CustomerForm";
import { CSVLink } from "react-csv";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params) => (
        <div>
          <Button onClick={() => handleDelete(params.value)}>Delete</Button>
          <Button onClick={() => handleEdit(params.data)}>Edit</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${id}`, {
        method: "DELETE",
      })
        .then((res) => fetchCustomers())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      <CustomerForm onSave={fetchCustomers} />
      <CSVLink data={customers} filename="customers.csv">
        <Button variant="contained">Export to CSV</Button>
      </CSVLink>
      <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={20}
          onGridReady={(params) => setGridApi(params.api)}
        />
      </div>
    </div>
  );
}

export default CustomerList;
