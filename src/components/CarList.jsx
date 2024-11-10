import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg, setMsg] = useState("");

  const [colDefs] = useState([
    { field: "brand" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear" },
    { field: "price" },
    {
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <>
          <EditCar car={params.data} updateCar={updateCar} />
          <Button size="small" color="error" onClick={() => deleteCar(params.data)}>
            Delete
          </Button>
        </>
      ),
    },
  ]);

  const getCars = () => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const deleteCar = (car) => {
    fetch(car._links.car.href, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setMsg("Car deleted successfully");
          setOpenSnackbar(true);
          getCars();
        } else {
          setMsg("Failed to delete car");
          setOpenSnackbar(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const addCar = (newCar) => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Car added successfully");
          setOpenSnackbar(true);
          getCars();
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCar = (updatedCar, car) => {
    fetch(car._links.car.href, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Car updated successfully");
          setOpenSnackbar(true);
          getCars();
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => getCars(), []);

  return (
    <>
      <AddCar addCar={addCar} />
      <div className="ag-theme-material" style={{ width: "100%", height: "calc(100vh - 100px)" }}>
        <AgGridReact rowData={cars} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
      </div>
      <Snackbar open={openSnackbar} message={msg} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} />
    </>
  );
}
