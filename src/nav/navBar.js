import React from "react";
import firebase from "@firebase/app";
import { Link } from "react-router-dom";
import "./sideBar.css";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

import Sidebar from "./Sidebar";

function signOut() {
  firebase.auth().signOut();
}

function NavBar() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          href="/#/todo"
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          To Do
        </Typography>

        {/* Side panel? */}
        <Sidebar />

        {/* Sign in button */}
        
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
