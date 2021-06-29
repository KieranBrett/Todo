import React from 'react';
import firebase from "@firebase/app"
import './sideBar.css'


class GoogleSignIn extends React.Component {
    render() {
        return (<button class="btn btn-outline-light" onClick={this.googleSignIn}>Sign In with Google</button>);
    }
    
    googleSignIn() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
    }
}

export default GoogleSignIn