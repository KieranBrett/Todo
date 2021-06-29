import React from 'react';
import firebase from "@firebase/app"
import { Link } from "react-router-dom";
import './sideBar.css'

import {
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import GoogleSignIn from './googleSignIn';

class NavBar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
        <Link to="/" class="navbar-brand">To Do App!</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to="/" class="nav-link">Home</Link>
            </li>
            <li class="nav-item active">
              <Link to="/todo" class="nav-link">My Lists</Link>
            </li>
            {/* <li class="nav-item active">
              <Link to="/groups" class="nav-link">Groups</Link>
            </li> */}
          </ul>


          <div class="form-inline my-2">
            <FirebaseAuthConsumer>
              {({ isSignedIn }) => {
                if (!isSignedIn) { // If the user is authenticated/signed in
                  // return (<button class="btn btn-outline-light" onClick={this.googleSignIn}>Sign In with Google</button>);
                  return <GoogleSignIn />
                }
                else {
                  return (<button class="btn btn-outline-light" onClick={this.signOut}>Sign Out</button>);
                }
              }}
            </FirebaseAuthConsumer>
          </div>
        </div>

        <div id="footer">Kieran Brett @ 2021</div>
      </nav>);
  }

  signOut() {
    firebase.auth().signOut();
  }
  anonSignIn() {
    firebase.auth().signInAnonymously();
  }

  googleSignIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }

  handleSideBar() {
    let sideBar = document.getElementsById('sideBar');
  }
}

export default NavBar