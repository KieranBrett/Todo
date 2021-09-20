import React from 'react';
import firebase from "@firebase/app"
import { Link } from "react-router-dom";
import './sideBar.css'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import {
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import GoogleSignIn from './googleSignIn';


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

  return <AppBar position="static">
    <Toolbar>
      <IconButton href="/#/todo" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <HomeIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        To Do
      </Typography>

      {/* Sign in button */}
      <FirebaseAuthConsumer>
        {({ isSignedIn }) => {
          if (!isSignedIn) { // If the user is authenticated/signed in
            return <GoogleSignIn />
          }
          else {
            return (<Button color="secondary" size="small" variant="contained" onClick={signOut}>Sign Out</Button>);
          }
        }}
      </FirebaseAuthConsumer>

    </Toolbar>
  </AppBar>


}

export default NavBar