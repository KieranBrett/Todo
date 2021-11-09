import * as React from "react";
import firebase from "@firebase/app";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { FirestoreProvider } from "react-firestore";
import "@firebase/firestore";
import firebaseConfig from "./firebase-config";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
} from "@react-firebase/auth";

import NavBar from "./nav/navBar";
import db from "./firebase-config";
import GoogleSignIn from "./nav/googleSignIn";
import ToDo from "./todo/todo";

// Theme
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Service worker needs to uninstall the old one and install the new one, every time!!!!!!
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then({
      function(registration) {
        console.log("success: ", registration);
      },
      function(err) {
        console.log("failed: ", err);
      },
    });
  });
}

// Auth State Change (Create new users in the Database)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection("users").doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      id: user.uid,
    });
  }
});

// Creating Themes
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
})

ReactDOM.render(
  <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
    <Router>
      <FirebaseAuthConsumer>
        <NavBar />
      </FirebaseAuthConsumer>
      <div id="content">
        <Switch>
          <Route path="/*">
            <FirebaseAuthConsumer>
              {({ isSignedIn }) => {
                if (!isSignedIn) {
                  return (
                    <div id="signIn">
                      <h1>Sign in to view and edit your list!</h1>
                      <GoogleSignIn />
                    </div>
                  );
                }
              }}
            </FirebaseAuthConsumer>

            <IfFirebaseAuthed>
              <FirestoreProvider firebase={firebase}>

                <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  <ToDo db={db} />
                </ThemeProvider>

              </FirestoreProvider>
            </IfFirebaseAuthed>
          </Route>
        </Switch>
      </div>
    </Router>
  </FirebaseAuthProvider>,
  document.getElementById("root")
);
