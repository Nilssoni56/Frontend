import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

export default function EditCar({ car, updateCar }) {
  const [open, setOpen] = useState(false);
  const [updatedCar, setUpdatedCar] = useState(car);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setUpdatedCar({ ...updatedCar, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateCar(updatedCar, car);
    handleClose();
  };

  return (
    <>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          {["brand", "model", "color", "fuel", "modelYear", "price"].map((field) => (
            <TextField
              key={field}
              name={field}
              value={updatedCar[field]}
              onChange={handleInputChange}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
