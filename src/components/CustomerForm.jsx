import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#1976d2",
    },
  },
  margin: "8px",
  width: "100%",
});

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
});

function CustomerForm({ onSave }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          onSave();
          handleClose();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <StyledButton variant="contained" onClick={handleClickOpen}>
        Add New Customer
      </StyledButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", m: 1 }}>
            <StyledTextField
              name="firstname"
              label="First Name"
              value={customer.firstname}
              onChange={handleInputChange}
            />
            <StyledTextField name="lastname" label="Last Name" value={customer.lastname} onChange={handleInputChange} />
            <StyledTextField name="email" label="Email" value={customer.email} onChange={handleInputChange} />
            <StyledTextField name="phone" label="Phone" value={customer.phone} onChange={handleInputChange} />
            <StyledTextField
              name="streetaddress"
              label="Street Address"
              value={customer.streetaddress}
              onChange={handleInputChange}
            />
            <StyledTextField name="postcode" label="Postcode" value={customer.postcode} onChange={handleInputChange} />
            <StyledTextField name="city" label="City" value={customer.city} onChange={handleInputChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <StyledButton onClick={handleSave}>Save</StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomerForm;
