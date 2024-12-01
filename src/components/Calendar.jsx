import { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   margin: theme.spacing(2),
//   borderRadius: theme.spacing(2),
//   background: "linear-gradient(to right bottom, #ffffff 0%, #f8f9fa 100%)",
//   boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
//   "& .rbc-event": {
//     background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//     borderRadius: "4px",
//     transition: "transform 0.2s",
//     "&:hover": {
//       transform: "scale(1.02)",
//     },
//   },
//   "& .rbc-today": {
//     backgroundColor: "rgba(33, 150, 243, 0.1)",
//   },
// }));

const EnhancedCalendar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: "linear-gradient(135deg, #ECF0F1 0%, #BDC3C7 100%)",
  borderRadius: "20px",
  "& .rbc-event": {
    background: "linear-gradient(45deg, #2C3E50 30%, #3498DB 90%)",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 3px 5px rgba(44, 62, 80, 0.3)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  "& .rbc-today": {
    background: alpha(theme.palette.primary.main, 0.1),
  },
  "& .rbc-toolbar button:hover": {
    background: "#3498DB",
    color: "white",
  },
}));

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        if (data._embedded && data._embedded.trainings) {
          const calendarEvents = data._embedded.trainings.map((training) => ({
            title: `${training.activity} / ${
              training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : "No customer"
            }`,
            start: new Date(training.date),
            end: new Date(new Date(training.date).getTime() + training.duration * 60000),
          }));
          setEvents(calendarEvents);
        }
      })
      .catch((error) => console.error("Error fetching trainings:", error));
  };

  return (
    <EnhancedCalendar elevation={5}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#2C3E50",
          fontWeight: "bold",
          marginBottom: 3,
        }}
      >
        Training Schedule
      </Typography>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        views={["month", "week", "day"]}
      />
    </EnhancedCalendar>
  );
}
export default Calendar;
