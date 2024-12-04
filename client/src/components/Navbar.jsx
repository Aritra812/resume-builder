import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { Button, Avatar, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import Back Icon
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/profile.png";
import { logoutUser } from "../redux/userSlice";
import { clearEducation } from "../redux/educationSlice";
import { clearProjects } from "../redux/projectSlice";
import { clearExperience } from "../redux/experienceSlice";
import { clearExtraDetails } from "../redux/extraDetailsSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Navbar.css';
import { clearProfile } from "../redux/profileSlice";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [sectionsAnchorEl, setSectionsAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to determine the current path
  const dispatch = useDispatch();

  const handleLogout = async () => {
    toast.success("Logout Successful!", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(logoutUser());
    dispatch(clearProfile());
    dispatch(clearEducation());
    dispatch(clearProjects());
    dispatch(clearExperience());
    dispatch(clearExtraDetails());
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <nav className="nav-container">
     <AppBar 
  position="static" 
  style={{ backgroundColor: 'var(--bgColor)', color: 'black' }} // Original color retained
>
  <Toolbar>
    <div className="menu-icon">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
    </div>
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      {currentUser !== null ? (
        <List>
          <ListItem button component={Link} to="/" onClick={() => setIsDrawerOpen(false)}>
            <ListItemIcon>
              <HomeIcon style={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={() => setIsDrawerOpen(false)}>
            <ListItemIcon>
              <EditIcon style={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Edit Resume" />
          </ListItem>
          <ListItem button component={Link} to="/templates" onClick={() => setIsDrawerOpen(false)}>
            <ListItemIcon>
              <DescriptionIcon style={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Templates" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <div className="drawer-div">
          <h3 style={{ color: "#555", textAlign: "center", margin: "20px" }}>
            Login Please!
          </h3>
        </div>
      )}
    </Drawer>

    <img className="logo" src={logo} alt="resume" width={"40px"} height={"40px"} />
    <Typography
      className="logo-text"
      variant="h5"
      component="div"
      sx={{
        flexGrow: 1,
        marginLeft: "2px",
        fontWeight: "600",
      }}
    >
      <Link to="/" className="resume-builder-link" style={{ textDecoration: "none", color: "black" }}>
        FastCV.com
      </Link>
    </Typography>

    {location.pathname === "/sign-in" ? (
      <Button 
        onClick={handleBackClick} 
        style={{ color: "black", fontWeight: "600", textTransform: "none" }}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
    ) : (
      !currentUser && (
        <Link to="/sign-in" style={{ textDecoration: "none" }}>
          <Button style={{ color: "black", fontWeight: "600", textTransform: "none" }}>
            Login
          </Button>
        </Link>
      )
    )}
  </Toolbar>
</AppBar>

    </nav>
  );
};

export default Navbar;
