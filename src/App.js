import React, { useState } from "react";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import "./App.css";
import HOME from "./COMPONENTS/HOME";
import EXCHANGE from "./COMPONENTS/EXCHANGE ";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <div style={{ width: 250 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/exchange-rates"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Exchange Rates" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/about" onClick={toggleDrawer(false)}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <div style={{ padding: "10px 16px", display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}>Dark Mode</span>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <nav
            style={{
              backgroundColor: darkMode ? "#333" : "#1976d2",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 10px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {isMobile && (
                <IconButton
                  edge="start"
                  sx={{ color: "#fff" }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <h2 className="title" style={{ marginLeft: isMobile ? "10px" : "0" }}>
                Loan Calculator
              </h2>
            </div>

            {!isMobile && (
              <div className="links" style={{ display: "flex", flexWrap: "wrap" }}>
                <Link to="/" style={{ textDecoration: "none", padding: "10px" }}>
                  <Button variant="text" sx={{ color: "#ffffff" }}>
                    home
                  </Button>
                </Link>
                <Link
                  to="/exchange-rates"
                  style={{ textDecoration: "none", padding: "10px" }}
                >
                  <Button variant="text" sx={{ color: "#ffffff" }}>
                    exchange rates (live)
                  </Button>
                </Link>
                <Link
                  to="/about"
                  style={{ textDecoration: "none", padding: "10px" }}
                >
                  <Button variant="text" sx={{ color: "#ffffff" }}>
                    about
                  </Button>
                </Link>
                <Switch checked={darkMode} onChange={handleThemeChange} />
              </div>
            )}
          </nav>

          {/* Mobile Drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerList}
          </Drawer>

          <Routes>
            <Route path="/" element={<HOME />} />
            <Route path="/exchange-rates" element={<EXCHANGE />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
