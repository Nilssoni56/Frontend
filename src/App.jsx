import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Calendar from "./components/Calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Navbar />
        <div style={{ margin: 15 }}>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
