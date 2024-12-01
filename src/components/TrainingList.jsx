import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import TrainingForm from "./TrainingForm";
import { Button } from "@mui/material";

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  const columns = [
    {
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    {
      headerName: "Customer",
      field: "customer",
      sortable: true,
      filter: true,
      valueGetter: (params) =>
        params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : "",
    },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params) => (
        <Button variant="outlined" color="error" onClick={() => handleDelete(params.value)}>
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data._embedded.trainings));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((res) => fetchTrainings())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h2>Trainings</h2>
      <TrainingForm onSave={fetchTrainings} />
      <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
        <AgGridReact rowData={trainings} columnDefs={columns} pagination={true} paginationPageSize={10} />
      </div>
    </div>
  );
}

export default TrainingList;
