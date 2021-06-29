import * as React from "react";
import firebase from "@firebase/app"
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { FirestoreProvider } from 'react-firestore';
import '@firebase/firestore';
import firebaseConfig from './firebase-config';
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed
} from "@react-firebase/auth";

import NavBar from './nav/navBar';
import db from './firebase-config'
import GoogleSignIn from "./nav/googleSignIn";
import ToDo from "./todo/ToDo";

// Setting up service woker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then({
      function(registration) {
        console.log('success: ', registration);
      },
      function(err) {
        console.log('failed: ', err)
      }
    })
  })
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection("users").doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      id: user.uid,
    })
  }
});

ReactDOM.render(
  <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
    <Router>
      <FirebaseAuthConsumer>
        <NavBar />
      </FirebaseAuthConsumer>
      <div id="content">

        <Switch>
          <Route path="/todo">
            <FirebaseAuthConsumer>
              {({ isSignedIn }) => {
                if (!isSignedIn) {
                  return <div id="signIn"><h1>Sign in to view and edit your list!</h1>
                  <GoogleSignIn /></div>
                }
              }}
            </FirebaseAuthConsumer>

            <IfFirebaseAuthed>
              <FirestoreProvider firebase={firebase}>
                <ToDo db={db}/>
              </FirestoreProvider>
            </IfFirebaseAuthed>
          </Route>

          <Route path="/*">
            <h1>Welcome to the To Do App!</h1>

            <Link to="/todo" class="btn btn-success">Go to ToDo App!</Link>
          </Route>
        </Switch>
      </div>
    </Router>
  </FirebaseAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();