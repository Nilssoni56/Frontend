// import { AppBar, Toolbar, Button } from "@mui/material";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Button color="inherit" component={Link} to="/customers">
//           Customers
//         </Button>
//         <Button color="inherit" component={Link} to="/trainings">
//           Trainings
//         </Button>
//         <Button color="inherit" component={Link} to="/calendar">
//           Calendar
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const AnimatedNavBar = styled(AppBar)({
  background: "linear-gradient(90deg, #2C3E50 0%, #3498DB 100%)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(2px)",
  },
});

const NavButton = styled(Button)({
  margin: "0 10px",
  color: "white",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0",
    height: "2px",
    bottom: 0,
    left: "50%",
    background: "#ECF0F1",
    transition: "all 0.3s",
    transform: "translateX(-50%)",
  },
  "&:hover::after": {
    width: "80%",
  },
});

const Logo = styled(FitnessCenterIcon)({
  marginRight: "10px",
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

function Navbar() {
  return (
    <AnimatedNavBar position="static">
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <NavButton component={Link} to="/customers">
            Customers
          </NavButton>
          <NavButton component={Link} to="/trainings">
            Trainings
          </NavButton>
          <NavButton component={Link} to="/calendar">
            Calendar
          </NavButton>
        </Box>
      </Toolbar>
    </AnimatedNavBar>
  );
}

export default Navbar;
