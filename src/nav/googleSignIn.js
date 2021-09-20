import React from 'react';
import firebase from "@firebase/app"
import './sideBar.css'

// Material UI
import Button from '@material-ui/core/Button';

class GoogleSignIn extends React.Component {
    render() {
        return <Button color="primary" size="small" variant="contained" onClick={this.googleSignIn}>Sign In with Google</Button>
    }
    
    googleSignIn() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
    }
}

export default GoogleSignIn