import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

const StyledBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #ffffff 0%, #f7f7f7 100%)",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

const GradientButton = styled(Button)({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 20,
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  padding: "10px 30px",
  margin: "10px",
  "&:hover": {
    background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
    transform: "scale(1.02)",
  },
});

function TrainingForm({ onSave }) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [training, setTraining] = useState({
    date: dayjs(),
    duration: "",
    activity: "",
    customer: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
      .then((response) => response.json())
      .then((data) => {
        if (data._embedded && data._embedded.customers) {
          setCustomers(data._embedded.customers);
        }
      })
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleSave = () => {
    const trainingData = {
      date: training.date.toISOString(),
      duration: parseInt(training.duration),
      activity: training.activity,
      customer: training.customer,
    };

    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trainingData),
    })
      .then((response) => {
        if (response.ok) {
          onSave();
          setOpen(false);
          setTraining({
            date: dayjs(),
            duration: "",
            activity: "",
            customer: "",
          });
        }
      })
      .catch((error) => console.error("Error saving training:", error));
  };

  return (
    <>
      <GradientButton onClick={() => setOpen(true)}>Add New Training</GradientButton>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Training Session</DialogTitle>
        <DialogContent>
          <StyledBox>
            <DateTimePicker
              label="Date and Time"
              value={training.date}
              onChange={(newValue) => setTraining({ ...training, date: newValue })}
              sx={{ width: "100%", marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={training.duration}
              onChange={(e) => setTraining({ ...training, duration: e.target.value })}
            />
            <TextField
              fullWidth
              label="Activity"
              value={training.activity}
              onChange={(e) => setTraining({ ...training, activity: e.target.value })}
            />
            <TextField
              select
              fullWidth
              label="Customer"
              value={training.customer}
              onChange={(e) => setTraining({ ...training, customer: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select customer</option>
              {customers &&
                customers.map((customer) => (
                  <option key={customer._links?.self?.href} value={customer._links?.self?.href}>
                    {`${customer.firstname} ${customer.lastname}`}
                  </option>
                ))}
            </TextField>
          </StyledBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <GradientButton onClick={handleSave}>Save</GradientButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TrainingForm;
